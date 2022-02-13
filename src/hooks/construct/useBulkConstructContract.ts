// @ts-nocheck
import { useState } from 'react';

import { bulkConstructContract } from '../..';
import { HookStatus, HookState } from '../../types';
import { HOOK_LOADING } from '../constants';
import useClients from '../core/useClients';
import useSyncHookStates from '../core/useSyncHookStates';

export interface HookIndexedDBEntityAddState extends HookState {
  data?: any[];
}

export interface HookuseBulkConstructContractsOutput {
  action: any;
  status: HookStatus;
  meta?: any;
  data?: any;
  error?: any;
}

function useBulkConstructContract(
  addresses: Array<string>,
  keywords: Array<string>,
  chainId?: number
): HookuseBulkConstructContractsOutput {
  const [state, setState] = useState<HookIndexedDBEntityAddState>(HOOK_LOADING);

  const ACTION = () =>
    bulkConstructContract(
      data?.databaseClient,
      data?.scannerClient,
      addresses,
      keywords,
      chainId,
      setState
    );

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

export default useBulkConstructContract;
