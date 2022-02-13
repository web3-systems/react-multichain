import { HookStatus } from '../../types';

export async function entityWhere(
  databaseClient: any,
  table: string,
  chainId: number,
  setState: any
) {
  try {
    if (!databaseClient) return;
    const entities = await databaseClient.toArray(table, chainId);
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

export default entityWhere;
