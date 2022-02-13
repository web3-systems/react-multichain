import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

export async function entityGet(
  client: MultiChainIndexedDBClient | undefined,
  table: string,
  id: any,
  chainId?: number
) {
  try {
    const entity = await client?.get(table, id, chainId);
    return {
      meta: {
        msg: `get-${table}-${id}`,
      },
      data: entity,
    };
  } catch (error) {
    return error;
  }
}

export default entityGet;
