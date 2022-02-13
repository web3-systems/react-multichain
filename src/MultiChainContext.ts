import { createContext } from 'react';

import MultiChainInMemoryDatabase, {
  Database,
} from '@web3-systems/multichain-database';
import MultiChainProviders from '@web3-systems/multichain-providers';
import MultiScanClient from '@web3-systems/multiscan-client';

const MultiChainContext = createContext<{
  isReady: boolean;
  isDatabaseClientReady: boolean;
  isProviderClientReady: boolean;
  isScannerClientReady: boolean;
  observers: any;
  getScannerClient: () => MultiScanClient | undefined;
  getProviderClient: () => MultiChainProviders | undefined;
  getDatabaseClient: () => MultiChainInMemoryDatabase | undefined;
  getScanner: (_chainId: number) => any | undefined;
  getProvider: (_chainId: number) => any | undefined;
  getDatabase: (_chainId: number) => any | undefined;
}>({
  isReady: false,
  isDatabaseClientReady: false,
  isProviderClientReady: false,
  isScannerClientReady: false,
  observers: {
    database: {},
    provider: {},
    scanner: {},
  },
  getScannerClient: (): MultiScanClient | undefined => undefined,
  getProviderClient: (): MultiChainProviders | undefined => undefined,
  getDatabaseClient: (): MultiChainInMemoryDatabase | undefined => undefined,
  getScanner: (_chainId: number): any => undefined,
  getProvider: (_chainId: number): any => undefined,
  getDatabase: (_chainId: number): Database | undefined => undefined,
});

export default MultiChainContext;
