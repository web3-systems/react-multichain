import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

async function findOrAddDocumentWithId(
  client: MultiChainIndexedDBClient | undefined,
  table: 'accounts' | 'transactions' | 'contracts' | string,
  id: string,
  chainId?: number
) {
  try {
    if (!client) throw new Error('DatabaseClient Undefined');
    const documentExisting = await client.get(table, id);
    if (documentExisting) return documentExisting;
    await client.add(
      table,
      {
        address: id,
        chainId: chainId || 1,
      },
      undefined,
      chainId
    );
    const documentNew = await client.get(table, id);
    return documentNew;
  } catch (error) {
    return error;
  }
}

export default findOrAddDocumentWithId;
