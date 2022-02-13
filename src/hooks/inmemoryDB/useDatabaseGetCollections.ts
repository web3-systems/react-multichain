import { useState } from 'react';

import databaseListCollections from '../../actions/inmemoryDB/databaseListCollections';
import { EntityContract, HookState, HookStatus, ABI } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useObserverDatabaseSubscribe from '../core/useObserverDatabaseSubscribe';
import useOnDatabaseReady from '../core/useOnDatabaseReady';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookUseDatabaseListCollectionsState extends HookState {
  data?: EntityContract[];
}

export interface HookUseDatabaseListCollections {
  status: HookStatus;
  meta?: any;
  data?: ABI;
}

export function useDatabaseListCollections(
  chainId?: number
): HookUseDatabaseListCollections {
  const [state, setState] = useState<HookUseDatabaseListCollectionsState>(
    HOOK_LOADING
  );
  const { data: clientData, meta } = useClients(chainId || 1);
  const READY_OR_OBSERVATION = () =>
    databaseListCollections(clientData?.databaseClient, setState);
  useSyncHookStates(setState, meta, state); // Sync state with the the useClients lifecycle
  useOnDatabaseReady(READY_OR_OBSERVATION, !!clientData); // Fetch initial data when database is ready
  useObserverDatabaseSubscribe(chainId || 1, READY_OR_OBSERVATION); // Refetch data after database is updated

  return {
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
    // @ts-ignore
    error: state?.err,
  };
}

export default useDatabaseListCollections;
