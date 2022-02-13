import { useEffect } from 'react';

import useMultiChain from '../../useMultiChain';

function useObserverDatabaseSubscribe(chainId: number, callback: any) {
  const { observers } = useMultiChain();
  useEffect(() => {
    callback();
  }, [observers?.database[chainId]]);
}

export default useObserverDatabaseSubscribe;
