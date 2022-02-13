import { useEffect, useState } from 'react';

import { Transaction } from '@ethersproject/transactions';

// import findOrCreateAccount from '../core/findOrCreateAccount';
import { HookStatus, HookState } from '../../types';
import {
  createAccountTransasctionsFilter,
  destructureClientsAndValidate,
  isCacheValid,
} from '../../utils';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

interface HookUseClientsState extends HookState {
  data?: Transaction[];
}

export interface HookUseGetAccountTransactionsOutput {
  status: HookStatus;
  meta?: any;
  data?: Transaction[];
}

/**
 * @name useGetAccountTransactions
 * @description Fetch inbound/outbound transactions for an account.
 * @dev Fetches transactions from the scanner and database clients.
 *      First checking the cache, then fetching from the scanner if the cache is invalid.
 * @param address
 * @param nonce
 * @param chainId
 * @returns
 */
function useGetAccountTransactions(
  address: string,
  filter: 'from' | 'to' | 'self' | 'all' = 'from',
  chainId?: number
): HookUseGetAccountTransactionsOutput {
  // Initialize State
  const [state, setState] = useState<HookUseClientsState>(HOOK_LOADING);
  const { data: _clientsData, meta: _clientsMeta } = useClients(chainId);
  useSyncHookStates(setState, _clientsMeta, state);
  useEffect(() => {
    if (
      state?.status === HookStatus.LOADING &&
      state?.meta?.msg === 'clients-loaded'
    ) {
      const {
        scannerClient,
        providerClient,
        databaseClient,
      } = destructureClientsAndValidate(_clientsData);
      (async () => {
        let accountMeta;
        try {
          // accountMeta = findOrCreateAccount(databaseClient, address);
          accountMeta = { address: '0x0' };
        } catch (err) {
          setState({
            status: HookStatus.FAILURE,
            err: err,
            data: undefined,
            meta: undefined,
          });
        }

        const transactionCount = await providerClient.getTransactionCount(
          address,
          1
        );

        const transactions = databaseClient.find(
          'transactions',
          createAccountTransasctionsFilter(address, filter),
          chainId
        );

        /**
         * @dev To calculate the highest inbound transaction nonce, we need to fetch all relevent transactions
         *      and find the highest blocknumber transaction.
         */
        const latestInboundTransactions = databaseClient.search(
          'transactions',
          {
            simplesort: 'blockNumber',
            offset: transactionCount,
          },
          chainId
        );

        let isTransactionsCached = isCacheValid(
          filter,
          transactionCount,
          transactions.length,
          accountMeta
        );
        if (isTransactionsCached) {
          setState({
            status: HookStatus.SUCCESS,
            meta: {
              msg: 'transaction-loaded',
              data: {
                source: 'database',
                cache: true,
              },
            },
            data: transactions,
          });
        } else {
          const newest = latestInboundTransactions.reduce(
            (acc: any, curr: any) =>
              acc?.blockNumber > curr && curr?.blockNumber ? acc : curr,
            { blockNumber: 0 }
          );
          const newTransactions = await scannerClient.getAccountTransactions(
            address,
            {
              startblock: newest.blockNumber, // @TODO: Add function argument to allow for custom startblock
              endblock: 999999999, // TODO: Add global variable and function argument
            },
            chainId
          );
          const uncachedTransactions = newTransactions.filter(
            (tx: any) => tx.blockNumber > newest.blockNumber
          );
          databaseClient.insert('transactions', uncachedTransactions, chainId);
          databaseClient.update(
            'accounts',
            {
              ...accountMeta,
              address,
              nonce: transactionCount,
              inbound: newTransactions.length - transactionCount,
              total: newTransactions.length,
            },
            chainId
          );

          const transactionsSynced = databaseClient.find(
            'transactions',
            createAccountTransasctionsFilter(address, filter),
            chainId
          );
          setState({
            status: HookStatus.SUCCESS,
            meta: {
              msg: 'transaction-loaded',
              data: {
                source: 'scanner',
                cache: false,
              },
            },
            data: transactionsSynced,
          });
        }
      })();
    }
  }, [state, _clientsData, address, chainId, filter]);

  return {
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
  };
}

export default useGetAccountTransactions;
