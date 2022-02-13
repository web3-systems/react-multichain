import { useState } from 'react';

import entityBulkAdd from '../../actions/indexedDB/entityBulkAdd';
import { HookState, HookStatus } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookIndexedDBEntityBulkAddState extends HookState {
  data?: any;
}

export interface HookUseIndexedDBEntityBulkAdd {
  action: any;
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

export function useIndexedDBEntityBulkAdd(
  table: string,
  documents: Array<any>,
  chainId: number
): HookUseIndexedDBEntityBulkAdd {
  const [state, setState] = useState<HookIndexedDBEntityBulkAddState>(
    HOOK_LOADING
  );

  const ACTION = () =>
    entityBulkAdd(data?.databaseClient, table, documents, chainId, setState);

  const { data, meta } = useClients(chainId);
  useSyncHookStates(setState, meta, state);

  return {
    action: ACTION,
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
    error: state?.err,
  };
}

export default useIndexedDBEntityBulkAdd;
