// @ts-nocheck
import { useEffect, useState } from 'react';

import { useIsDatabaseClientReady } from '..';
import entityBulkGetOrAddWithAddressId from '../../actions/indexedDB/entityBulkGetOrAddWithAddressId';
import { HookStatus, HookState } from '../../types';
import { destructureClientsAndValidate } from '../../utils';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

interface HookUseClientsState extends HookState {
  data?: any;
}

export interface HookuseBulkConstructContractsOutput {
  status: HookStatus;
  meta?: any;
  data?: any;
}

function useBulkGetOrConstructContracts(
  addresses: string,
  chainId?: number
): HookuseBulkConstructContractsOutput {
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
  }, [addresses]);

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
        const entity = await entityBulkGetOrAddWithAddressId(
          databaseClient,
          'contracts',
          addresses,
          chainId
        );

        console.log(entity, 'ENTITIES');
      })();
    }
  }, [state, isDatabaseClientReady, clients, addresses, chainId]);

  return {
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
  };
}

export default useBulkGetOrConstructContracts;
