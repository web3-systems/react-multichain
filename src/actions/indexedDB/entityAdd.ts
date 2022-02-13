import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

import { HookStatus } from '../..';

export async function entityAdd(
  client: MultiChainIndexedDBClient | undefined,
  table: string,
  id: any,
  document: any,
  chainId: number,
  setState: Function
) {
  try {
    const entity = await client?.add(table, document, id, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `add-${table}-${id}`,
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

export default entityAdd;
