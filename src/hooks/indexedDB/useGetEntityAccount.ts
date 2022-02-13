import { useEffect, useState } from 'react';

import { useIsDatabaseClientReady } from '..';
import findOrAddDocumentWithId from '../../actions/indexedDB/findOrAddDocumentWithId';
import { HookStatus, HookState } from '../../types';
import { destructureClientsAndValidate } from '../../utils';
import updateContractEntityFromScannerContractSourceCode from '../../utils/createContractEntityFromScannerContractSourceCode';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

interface HookUseGetEntityAccountState extends HookState {
  data?: any;
}

export interface HookUseGetEntityAccountOutput {
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

/**
 * @name useGetEntityAccount
 * @description Fetch smart contract
 * @dev Fetches smart contract from the database and/or scanner clients.
 * @param address
 * @param nonce
 * @param chainId
 * @returns
 */
function useGetEntityAccount(
  address: string,
  chainId?: number
): HookUseGetEntityAccountOutput {
  const isDatabaseClientReady = useIsDatabaseClientReady();
  const [state, setState] = useState<HookUseGetEntityAccountState>({
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
      let scannerClient, databaseClient;
      try {
        const {
          scannerClient: _scannerClient,
          databaseClient: _databaseClient,
        } = destructureClientsAndValidate(clients);
        scannerClient = _scannerClient;
        databaseClient = _databaseClient;
      } catch (error) {
        setState({
          status: HookStatus.FAILURE,
          meta: {
            msg: 'clients-error',
          },
        });
      }

      (async () => {
        const document = await findOrAddDocumentWithId(
          databaseClient,
          'accounts',
          address,
          chainId
        );

        if (typeof document === 'undefined') {
          setState({
            status: HookStatus.FAILURE,
            meta: {
              msg: 'database-error',
            },
          });
        }

        let cachedContractSourceCode = false;
        if (document?.sourceCode) {
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
            data: document,
          });
          return;
        }

        const contractSourceCode = await scannerClient.getEntityAccountSourceCode(
          address,
          chainId
        );
        if (typeof contractSourceCode === 'undefined') {
          setState({
            status: HookStatus.FAILURE,
            meta: {
              msg: 'scanner-error',
            },
          });
          return;
        }

        const _document = updateContractEntityFromScannerContractSourceCode(
          document,
          contractSourceCode
        );

        await databaseClient.put('contracts', _document, chainId);
        setState({
          status: HookStatus.SUCCESS,
          meta: {
            msg: 'abi-loaded',
            data: {
              source: 'scanner',
              cache: false,
            },
          },
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

export default useGetEntityAccount;
