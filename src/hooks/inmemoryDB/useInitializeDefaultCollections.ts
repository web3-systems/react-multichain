import { useEffect, useState } from 'react';

import { useMultiChain } from '../..';
import useClients from '../core/useClients';

export interface HooIUseinitializeDefaultCollectionsOutput {
  data: {
    chainId: number;
    scanner?: any;
    provider?: any;
    database?: any;
  };
  error?: any;
}

function useInitializeDefaultCollections(chainId: number = 1): boolean {
  const { data } = useClients(chainId);
  const appState = useMultiChain();
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    if (typeof data === 'undefined') return;
    if (appState.isReady && data.databaseClient) {
      // data.databaseClient.initializeDefaultCollections(chainId);
      setStatus(true);
    }
  }, [appState.isReady, data, chainId]);

  return status;
}

export default useInitializeDefaultCollections;
