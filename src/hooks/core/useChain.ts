import { useEffect, useState } from 'react';

import useMultiChain from '../../useMultiChain';

export interface HookUseChainOutput {
  data: {
    chainId: number;
    scanner?: any;
    provider?: any;
    database?: any;
  };
  error?: any;
}

/**
 * @name useChain
 * @description Connect to the scanner, provider and database for the given chainId.
 * @param chainId
 * @returns HookUseChainOutput
 */
function useChain(chainId: number = 1): HookUseChainOutput {
  const appState = useMultiChain();

  // @TODO Add types to object values
  const [error, setError] = useState<any>();
  const [hookState, setHookState] = useState<{
    chainId: number;
    scanner?: any;
    provider?: any;
    database?: any;
    error?: any;
  }>({
    chainId: chainId,
    scanner: undefined,
    provider: undefined,
    database: undefined,
  });

  /**
   * @dev Using the chainId load scanner, provider and database client instances.
   * @dev Client instances are never stored in the appState and are only fetched when required.
   */
  useEffect(() => {
    try {
      const scanner = appState.getScanner(chainId);
      const provider = appState.getProvider(chainId);
      const database = appState.getDatabase(chainId);
      setHookState({
        chainId: chainId,
        scanner: scanner,
        provider: provider,
        database: database,
      });
    } catch (error) {
      setError(error);
    }
  }, [chainId, appState]);

  return {
    data: hookState,
    error: error,
  };
}

export default useChain;
