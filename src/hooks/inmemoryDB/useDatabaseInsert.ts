import { useState } from 'react';

import databaseInsert from '../../actions/inmemoryDB/databaseInsert';
import { EntityContract, HookState, HookStatus, ABI } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../useSyncHookStates';

export interface HookUseDatabaseInsertState extends HookState {
  data?: EntityContract[];
}

export interface HookUseDatabaseInsert {
  status: HookStatus;
  meta?: any;
  data?: ABI;
}

export function useDatabaseInsert(
  entity: string,
  query: any = {},
  chainId?: number
): any {
  const [state, setState] = useState<HookUseDatabaseInsertState>(HOOK_LOADING);
  const { data: clientData, meta } = useClients(chainId);
  const HANDLE_INSERT = () =>
    databaseInsert(
      clientData?.databaseClient,
      entity,
      query,
      chainId || 1,
      setState
    );
  useSyncHookStates(setState, meta, state); // Sync state with the the useClients lifecycle

  return [
    {
      status: state?.status,
      data: state?.data,
      meta: state?.meta,
      // @ts-ignore
      error: state?.err,
    },
    HANDLE_INSERT,
  ];
}

export default useDatabaseInsert;
