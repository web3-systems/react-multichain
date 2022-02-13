import { useEffect } from 'react';

import { HookStatus } from '../../types';

function useSyncHookStates(setState: Function, meta: any, hookState: any) {
  useEffect(() => {
    if (
      meta?.msg === 'clients-loaded' &&
      hookState?.status === HookStatus.REQUEST
    ) {
      setState({
        status: HookStatus.LOADING,
        meta: meta,
        data: undefined,
      });
    }
  }, [meta, setState]);
}

export default useSyncHookStates;
