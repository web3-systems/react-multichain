import { useEffect } from 'react';

import useIsDatabaseClientReady from './useIsDatabaseClientReady';

function useOnDatabaseReady(action: Function, clientReady: boolean) {
  const isDatabaseClientReady = useIsDatabaseClientReady();
  useEffect(() => {
    if (isDatabaseClientReady && clientReady) {
      action();
    }
    // @ts-ignore
  }, [isDatabaseClientReady, clientReady]);
}

export default useOnDatabaseReady;
