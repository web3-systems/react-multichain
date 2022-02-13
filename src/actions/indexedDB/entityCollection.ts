import { MultiChainIndexedDBClient } from '@web3-systems/multichain-database';

import { HookStatus } from '../../types';

export async function entityCollection(
  client: MultiChainIndexedDBClient,
  table: string,
  _query: any,
  chainId: number,
  setState: any
) {
  try {
    if (!client) return;
    const entities = await client.toCollection(table, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `${table}-loaded`,
        data: {
          source: 'database',
          cache: true,
        },
      },
      data: entities,
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

export default entityCollection;
