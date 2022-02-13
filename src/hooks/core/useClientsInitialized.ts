import { useEffect, useState } from 'react';

function useClientsInitialized(clients: any): any {
  const [state, setState] = useState<any>();
  useEffect(() => {
    if (
      !state?.isClientsInitialized &&
      clients.databaseClient &&
      clients.scannerClient &&
      clients.providerClient
    ) {
      const getScannerClient = () => clients.scannerClient;
      const getProviderClient = () => clients.providerClient;
      const getDatabaseClient = () => clients.databaseClient;
      const getScanner = (chainId: number) =>
        clients.scannerClient?.connect(chainId);
      const getProvider = (chainId: number) =>
        clients.providerClient?.getProvider(chainId);
      const getDatabase = (chainId: number) =>
        clients.databaseClient?.get(chainId);

      setState({
        isClientsInitialized: true,
        getScannerClient,
        getProviderClient,
        getDatabaseClient,
        getScanner,
        getProvider,
        getDatabase,
      });
    }
  }, [clients]);
  return state;
}

export default useClientsInitialized;
