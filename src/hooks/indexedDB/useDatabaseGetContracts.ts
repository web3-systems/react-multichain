import { useState } from 'react';

import entityFind from '../../actions/indexedDB/entityFind';
import { EntityContract, HookState, HookStatus, ABI } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useObserverDatabaseSubscribe from '../core/useObserverDatabaseSubscribe';
import useOnDatabaseReady from '../core/useOnDatabaseReady';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookUseDatabaseGetContractsState extends HookState {
  data?: EntityContract[];
}

export interface HookUseDatabaseGetContracts {
  status: HookStatus;
  meta?: any;
  data?: ABI;
}

export function useDatabaseGetContracts(
  query: any = {},
  chainId?: number
): HookUseDatabaseGetContracts {
  const [state, setState] = useState<HookUseDatabaseGetContractsState>(
    HOOK_LOADING
  );
  const { data: clientData, meta } = useClients(chainId);
  const READY_OR_OBSERVATION = () =>
    entityFind(
      clientData?.databaseClient,
      'contracts',
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
  };
}

export default useDatabaseGetContracts;
