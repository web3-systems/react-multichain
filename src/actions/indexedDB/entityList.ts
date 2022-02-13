import { HookStatus } from '../../types';

export async function entityList(
  client: any | undefined,
  table: string,
  chainId: number,
  setState: any
) {
  try {
    if (!client) return;
    const entities = await client.toArray(table, chainId);
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

export default entityList;
