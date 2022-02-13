import { useState } from 'react';

import entityList from '../../actions/indexedDB/entityList';
import { EntityContract, HookState, HookStatus } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useObserverDatabaseSubscribe from '../core/useObserverDatabaseSubscribe';
import useOnDatabaseReady from '../core/useOnDatabaseReady';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookUseIndexedDBEntityListState extends HookState {
  data?: EntityContract[];
}

export interface HookUseIndexedDBEntityList {
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

export function useIndexedDBEntityList(
  entity: string,
  chainId?: number
): HookUseIndexedDBEntityList {
  const [state, setState] = useState<HookUseIndexedDBEntityListState>(
    HOOK_LOADING
  );
  const { data: clientData, meta } = useClients(chainId);
  const READY_OR_OBSERVATION = () =>
    entityList(
      clientData?.databaseClient || undefined,
      entity,
      chainId || 1,
      setState
    );
  useSyncHookStates(setState, meta, state); // Sync state with the the useClients lifecycle
  useOnDatabaseReady(READY_OR_OBSERVATION, !!clientData); // Fetch initial data when database is ready
  useObserverDatabaseSubscribe(chainId || 1, READY_OR_OBSERVATION); // Refetch data after database is updated

  return {
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
    error: state?.err,
  };
}

export default useIndexedDBEntityList;
