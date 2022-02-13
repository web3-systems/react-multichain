import { useState } from 'react';

import entityFilter from '../../actions/indexedDB/entityFilter';
import { EntityContract, HookState, HookStatus } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useObserverDatabaseSubscribe from '../core/useObserverDatabaseSubscribe';
import useOnDatabaseReady from '../core/useOnDatabaseReady';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookUseIndexedDBEntityFilterState extends HookState {
  data?: EntityContract[];
}

export interface HookUseIndexedDBEntityFilter {
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

export function useIndexedDBEntityFilter(
  entity: string,
  query: any = () => true,
  chainId?: number
): HookUseIndexedDBEntityFilter {
  const [state, setState] = useState<HookUseIndexedDBEntityFilterState>(
    HOOK_LOADING
  );
  const { data: clientData, meta } = useClients(chainId);
  const READY_OR_OBSERVATION = () =>
    entityFilter(
      clientData?.databaseClient || undefined,
      entity,
      query,
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

export default useIndexedDBEntityFilter;
