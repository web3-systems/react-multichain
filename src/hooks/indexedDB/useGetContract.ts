import { useEffect, useState } from 'react';

import { useIsDatabaseClientReady } from '..';
import entityGetOrAddWithId from '../../actions/indexedDB/entityGetOrAddWithId';
import { HookStatus, HookState } from '../../types';
import { destructureClientsAndValidate } from '../../utils';
import updateContractEntityFromScannerContractSourceCode from '../../utils/createContractEntityFromScannerContractSourceCode';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

interface HookUseClientsState extends HookState {
  data?: any;
}

export interface HookUseGetContractOutput {
  status: HookStatus;
  meta?: any;
  data?: any;
}

/**
 * @name useGetContract
 * @description Fetch smart contract
 * @dev Fetches smart contract from the database and/or scanner clients.
 * @param address
 * @param nonce
 * @param chainId
 * @returns
 */
function useGetContract(
  address: string,
  chainId?: number
): HookUseGetContractOutput {
  const isDatabaseClientReady = useIsDatabaseClientReady();
  const [state, setState] = useState<HookUseClientsState>({
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

  const AddressZero = '0x0000000000000000000000000000000000000000';

  useEffect(() => {
    if (
      AddressZero !== address &&
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
        const entity = await entityGetOrAddWithId(
          databaseClient,
          'contracts',
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
        if (entity?.data?.abi) {
          cachedContractSourceCode = true;
        }

        if (cachedContractSourceCode) {
          setState({
            status: HookStatus.SUCCESS,
            meta: {
              msg: 'contract-loaded',
              data: {
                source: 'database',
                cache: true,
              },
            },
            data: entity,
          });
          return;
        }

        const contractSourceCode = await scannerClient.getContractSourceCode(
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
          entity.data,
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

export default useGetContract;
