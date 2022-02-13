import { useEffect } from 'react';

function useDatabaseAddCollectionsAfterLoad(
  databaseClient: any,
  chains: any,
  loadedChains: any,
  state: any,
  setState: any
) {
  useEffect(() => {
    if (loadedChains.length === chains?.length && databaseClient) {
      for (let index = 0; index < chains.length; index++) {
        databaseClient.initializeDefaultCollections(chains[index].chainId);
      }
      setState({
        ...state,
        databasesLoaded: true,
      });
    }
  }, [databaseClient, chains, loadedChains, state, setState]);
}

export default useDatabaseAddCollectionsAfterLoad;
