import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

import { HookStatus } from '../..';

export async function entityBulkAdd(
  client: MultiChainIndexedDBClient | undefined,
  table: string,
  documents: Array<any>,
  chainId: number,
  setState: Function
) {
  try {
    const entity = await client?.bulkAdd(table, documents, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `bulkAdd-${table}-success`,
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

export default entityBulkAdd;
