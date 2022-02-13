import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

import { HookStatus } from '../..';

export async function entityBulkPut(
  client: MultiChainIndexedDBClient | undefined,
  table: string,
  documents: Array<any>,
  chainId: number,
  setState: Function
) {
  try {
    console.log(documents, 'documents');
    const entity = await client?.bulkPut(table, documents, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `bulkPut-${table}-success`,
      },
      data: entity,
    });
  } catch (error) {
    setState({
      status: HookStatus.FAILURE,
      meta: undefined,
      data: undefined,
      err: error,
    });
  }
}

export default entityBulkPut;
