import { useEffect, useState } from 'react';

import MultichainInMemoryDatabase from '@web3-systems/multichain-database';
import MultichainProviders from '@web3-systems/multichain-providers';
import MultiscanClient from '@web3-systems/multiscan-client';

import { HookState, HookStatus } from '../../types';
import useMultiChain from '../../useMultiChain';

interface Data {
  chainId: number;
  scannerClient?: MultiscanClient;
  providerClient?: MultichainProviders;
  databaseClient?: MultichainInMemoryDatabase;
}

interface HookUseClientsState extends HookState {
  data?: Data;
}

export interface HookUseClientsOutput {
  status: HookStatus;
  meta?: any;
  data?: Data;
}

/**
 * @name useClients
 * @description Connect to scanner, provider and database class instances.
 * @param chainId
 * @returns HookUseClientsOutput
 */
function useClients(chainId: number = 1): HookUseClientsOutput {
  const appState = useMultiChain();

  const [state, setState] = useState<HookUseClientsState>({
    status: HookStatus.LOADING,
    meta: undefined,
    data: {
      chainId: chainId,
      scannerClient: undefined,
      providerClient: undefined,
      databaseClient: undefined,
    },
  });

  useEffect(() => {
    try {
      const scanner = appState.getScannerClient();
      const provider = appState.getProviderClient();
      const database = appState.getDatabaseClient();
      setState({
        status: HookStatus.LOADING,
        meta: {
          msg: 'clients-loaded',
        },
        data: {
          chainId: chainId,
          scannerClient: scanner,
          providerClient: provider,
          databaseClient: database,
        },
      });
    } catch (error) {
      const e = error as Error;
      setState({
        status: HookStatus.FAILURE,
        meta: {
          msg: e.message,
        },
      });
    }
  }, [appState, chainId]);

  return {
    status: state.status,
    meta: state.meta,
    data: state.data,
  };
}

export default useClients;
