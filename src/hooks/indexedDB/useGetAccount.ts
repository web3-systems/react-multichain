import { useEffect, useState } from 'react';

import findOrAddDocumentWithId from '../../actions/indexedDB/findOrAddDocumentWithId';
import { HookStatus, HookState, ABI } from '../../types';
import { destructureClientsAndValidate } from '../../utils';
// import updateContractEntityFromScannerContractSourceCode from '../../utils/createContractEntityFromScannerContractSourceCode';
import useClients from '../core/useClients';
import useIsDatabaseClientReady from '../core/useIsDatabaseClientReady';
import useSyncHookStates from '../core/useSyncHookStates';

interface HookUseGetAccountState extends HookState {
  data?: any;
}

export interface HookUseGetAccount {
  status: HookStatus;
  meta?: any;
  data?: ABI;
}

/**
 * @name useGetAccount
 * @description Fetch account entity
 * @dev Fetches account entity
 * @param address
 * @param nonce
 * @param chainId
 * @returns
 */
function useGetAccount(address: string, chainId?: number): HookUseGetAccount {
  const isDatabaseClientReady = useIsDatabaseClientReady();
  const [state, setState] = useState<HookUseGetAccountState>({
    status: HookStatus.LOADING,
    meta: undefined,
    data: undefined,
  });

  const { data: clients, meta: clientsMeta } = useClients(chainId);
  useSyncHookStates(setState, clientsMeta, state);

  useEffect(() => {
    if (state.status === HookStatus.REQUEST) return;
    setState({
      status: HookStatus.REQUEST,
      meta: undefined,
      data: undefined,
    });
  }, [address]);

  useEffect(() => {
    if (
      isDatabaseClientReady &&
      (state?.status === HookStatus.REQUEST ||
        (state?.status === HookStatus.LOADING &&
          state?.meta?.msg === 'clients-loaded'))
    ) {
      let scannerClient, databaseClient, providerClient;
      console.log('WTF');
      try {
        const {
          scannerClient: _scannerClient,
          databaseClient: _databaseClient,
          providerClient: _providerClient,
        } = destructureClientsAndValidate(clients);
        scannerClient = _scannerClient;
        databaseClient = _databaseClient;
        providerClient = _providerClient;
      } catch (error) {
        setState({
          status: HookStatus.FAILURE,
          meta: {
            msg: 'clients-error',
          },
        });
      }

      (async () => {
        const entity = await findOrAddDocumentWithId(
          clients?.databaseClient,
          'accounts',
          address,
          chainId
        );

        if (typeof entity === 'undefined') {
          setState({
            status: HookStatus.FAILURE,
            meta: {
              msg: 'database-error',
            },
          });
        }

        let cachedContractSourceCode = false;
        if (entity?.nonce) {
          cachedContractSourceCode = true;
        }

        if (cachedContractSourceCode) {
          setState({
            status: HookStatus.SUCCESS,
            meta: {
              msg: 'abi-loaded',
              data: {
                source: 'database',
                cache: true,
              },
            },
            data: entity,
          });
          return;
        }

        const nonce = await providerClient.getNonce(address, chainId);
        const balance = await scannerClient.getAccountBalance(address, chainId);
        const ensName = await providerClient.lookupAddress(address, chainId);

        console.log(nonce, balance, ensName, 'nonce');

        if (typeof balance === 'undefined') {
          setState({
            status: HookStatus.FAILURE,
            meta: {
              msg: 'scanner-error',
            },
          });
          return;
        }

        const _document = {
          address,
          balance,
          nonce,
          ensName,
        };
        await databaseClient.put('accounts', _document, chainId);
        setState({
          status: HookStatus.SUCCESS,
          meta: {
            msg: 'abi-loaded',
            data: {
              source: 'scanner',
              cache: false,
            },
          },
          // @ts-ignore
          data: _document,
        });
        return;
      })();
    }
  }, [state, isDatabaseClientReady, clients, address, chainId]);

  return {
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
  };
}

export default useGetAccount;
