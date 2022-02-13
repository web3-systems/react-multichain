import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import MultiChainIndexedDBClient from '@web3-systems/multichain-database';
import MultiChainProvidersClient from '@web3-systems/multichain-providers';
import MultiScanClient from '@web3-systems/multiscan-client';
import { useImmerReducer } from 'use-immer';

import useClientsInitialized from './hooks/core/useClientsInitialized';
import MultiChainContext from './MultiChainContext';
import ObserverContext from './ObserverContext';
import { reducer, reducerObserver } from './state';
import { ChainsConfig } from './types';
import { initializeMultichains } from './utils';

export interface MultiChainProviderProps {
  chains?: Array<ChainsConfig>;
  database?: {
    collections: {
      name: string;
      options: {
        unique: Array<string>;
        indices: Array<string>;
        exact: Array<string>;
      };
    };
  };
  children: ReactNode;
}

/**
 * @name MultiChainProvider
 * @description State management for reads/writes requests across multiple EVM chains.
 * @param props
 * @returns ReactNode
 */
function MultiChainProvider({
  children,
  chains,
}: MultiChainProviderProps): ReactNode {
  const observerState = useContext(ObserverContext);
  const initialState = useContext(MultiChainContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateObserver, dispatchObserver] = useImmerReducer(
    reducerObserver,
    observerState
  );

  const [scannerClient, setScannerClient] = useState<MultiScanClient>();
  const [providerClient, setProviderClient] = useState<
    MultiChainProvidersClient
  >();
  const [databaseClient, setDatabaseClient] = useState<
    MultiChainIndexedDBClient
  >();

  const getClients = useClientsInitialized({
    scannerClient,
    providerClient,
    databaseClient,
  });

  const databaseEventHook = useCallback(
    ({ event, collection }: any) => {
      dispatchObserver({
        type: 'SET_DATABASE_OBSERVER',
        payload: {
          chainId: 1,
          collection: collection,
          event: event,
          data: Date.now(),
        },
      });
    },
    [dispatchObserver]
  );

  const [databaseReadyCounter, setDatabaseReadyCounter] = useState(0);
  const increase = () => setDatabaseReadyCounter(databaseReadyCounter + 1);
  useEffect(() => {
    if (databaseReadyCounter === chains?.length && databaseClient) {
      dispatch({
        type: 'IS_DATABASE_CLIENT_READY',
        payload: true,
      });
    }
  }, [
    databaseReadyCounter,
    chains,
    databaseClient,
    databaseEventHook,
    dispatch,
    dispatchObserver,
  ]);

  useEffect(() => {
    const scanners = new MultiScanClient();
    const providers = new MultiChainProvidersClient();
    const databasesIndexedDB = new MultiChainIndexedDBClient();
    console.log(databasesIndexedDB, 'databasesIndexedDB');
    setScannerClient(scanners);
    setProviderClient(providers);
    setDatabaseClient(databasesIndexedDB);
    initializeMultichains(
      scanners,
      providers,
      databasesIndexedDB,
      increase,
      dispatchObserver,
      chains
    );
    dispatch({
      type: 'IS_READY',
      payload: true,
    });
  }, [chains]);

  return (
    <MultiChainContext.Provider
      value={{
        ...state,
        observers: stateObserver,
        ...getClients,
      }}
    >
      {children}
    </MultiChainContext.Provider>
  );
}

export default MultiChainProvider;
