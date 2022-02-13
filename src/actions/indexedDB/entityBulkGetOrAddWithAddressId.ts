import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

async function entityBulkGetOrAddWithAddressId(
  client: MultiChainIndexedDBClient | undefined,
  table: 'accounts' | 'transactions' | 'contracts' | string,
  ids: Array<string>,
  chainId?: number
): Promise<Array<any>> {
  try {
    if (!client) throw new Error('DatabaseClient Undefined');
    const documentsExisting = await client.bulkGet(table, ids);
    console.log(documentsExisting, 'documentsExistingdocumentsExisting');
    for (let index = 0; index < documentsExisting.length; index++) {
      const document = documentsExisting[index];
      if (typeof document === 'undefined') {
        documentsExisting[index] = await client.add(
          table,
          {
            address: ids[index],
          },
          chainId
        );
      }
    }
    return await client.bulkGet(table, ids);
  } catch (error) {
    return error;
  }
}

export default entityBulkGetOrAddWithAddressId;
