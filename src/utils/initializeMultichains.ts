// @ts-nocheck
import MultiChainIndexedDBClient from '@web3-systems/multichain-database';
import MultiChainProviders from '@web3-systems/multichain-providers';
import MultiScanClient from '@web3-systems/multiscan-client';

import { ChainsConfig } from '../types';
function initializeMultichains(
  scanners: MultiScanClient,
  providers: MultiChainProviders,
  databases: MultiChainIndexedDBClient,
  onReadyCounter: Function,
  dispatchObserver: Function,
  chains?: ChainsConfig[]
) {
  if (chains) {
    for (const chain of chains) {
      const _db = databases.createDatabase(chain.chainId, onReadyCounter);
      _db.use({
        stack: 'dbcore',
        name: 'ObserverMiddleware',
        create(downlevelDatabase) {
          return {
            ...downlevelDatabase,
            table(tableName) {
              const downlevelTable = downlevelDatabase.table(tableName);
              return {
                ...downlevelTable,
                mutate: req => {
                  dispatchObserver({
                    type: 'SET_DATABASE_OBSERVER',
                    payload: {
                      chainId: chain.chainId,
                      collection: tableName,
                      event: req?.type,
                      data: Date.now(),
                    },
                  });
                  return downlevelTable.mutate(req);
                },
              };
            },
          };
        },
      });
      if (chain.providerUrl) {
        providers.connect(chain.chainId, chain.providerUrl);
      }
      if (chain.scannerApiKey) {
        scanners.connect(chain.chainId, chain.scannerApiKey);
      }
    }
  }
}

export default initializeMultichains;
