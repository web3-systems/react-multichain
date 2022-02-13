import { HookStatus } from '../../types';

export async function entityDelete(
  databaseClient: any,
  table: string,
  id: any,
  chainId: number,
  setState: any
) {
  try {
    if (!databaseClient) return;
    const _entity = await databaseClient.delete(table, id, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `${table}-${id}-deleted`,
      },
      data: _entity,
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

export default entityDelete;
