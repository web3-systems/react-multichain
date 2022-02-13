import { useState } from 'react';

import entityAdd from '../../actions/indexedDB/entityAdd';
import { HookState, HookStatus } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookIndexedDBEntityAddState extends HookState {
  data?: any[];
}

export interface HookUseIndexedDBEntityAdd {
  action: any;
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

export function useIndexedDBEntityAdd(
  table: string,
  document: any,
  id: any,
  chainId: number
): HookUseIndexedDBEntityAdd {
  const [state, setState] = useState<HookIndexedDBEntityAddState>(HOOK_LOADING);

  const ACTION = () =>
    entityAdd(data?.databaseClient, table, document, id, chainId, setState);

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

export default useIndexedDBEntityAdd;
