import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';
import MultiscanClient from '@web3-systems/multiscan-client';

import { entityBulkPut } from '..';
import { HookStatus } from '../..';
import entityBulkGetOrAddWithAddressId from '../indexedDB/entityBulkGetOrAddWithAddressId';
import scannerBulkFetchContractMetaIfRequired from '../scanner/scannerBulkFetchContractMetaIfRequired';

export async function bulkConstructContract(
  client: MultiChainIndexedDBClient | undefined,
  scannerclient: MultiscanClient | undefined,
  addresses: Array<string>,
  keywords: Array<string>,
  chainId: number,
  setState: Function
): Promise<any> {
  try {
    const entities = await entityBulkGetOrAddWithAddressId(
      client,
      'contracts',
      addresses,
      chainId
    );
    const __entities = entities.map((e: any) => {
      let _e = e;
      _e.keywords = keywords;
      return _e;
    });
    const _entities = await scannerBulkFetchContractMetaIfRequired(
      scannerclient,
      __entities,
      chainId
    );
    entityBulkPut(client, 'contracts', _entities, chainId, () => {});
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `bulkConstruct-contract`,
      },
    });
  } catch (error) {
    setState({
      status: HookStatus.FAILURE,
      meta: {
        msg: `bulkConstruct-contract`,
      },
      error: error,
    });
  }
}

export default bulkConstructContract;
