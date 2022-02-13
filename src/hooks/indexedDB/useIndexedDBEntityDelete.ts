import { useState } from 'react';

import entityDelete from '../../actions/indexedDB/entityDelete';
import { EntityContract, HookState, HookStatus } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookIndexedDBEntityDeleteState extends HookState {
  data?: EntityContract[];
}

export interface HookUseIndexedDBEntityDelete {
  action: any;
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

export function useIndexedDBEntityDelete(
  table: string,
  id: any,
  chainId?: number
): HookUseIndexedDBEntityDelete {
  const [state, setState] = useState<HookIndexedDBEntityDeleteState>(
    HOOK_LOADING
  );
  const ACTION = () =>
    entityDelete(clientData?.databaseClient, table, id, chainId || 1, setState);

  const { data: clientData, meta } = useClients(chainId);
  useSyncHookStates(setState, meta, state);

  return {
    action: ACTION,
    status: state?.status,
    data: state?.data,
    meta: state?.meta,
    error: state?.err,
  };
}

export default useIndexedDBEntityDelete;
