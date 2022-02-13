import { HookStatus } from '../../types';

export function databaseListCollections(databaseClient: any, setState: any) {
  try {
    if (!databaseClient) throw new Error('DatabaseClient Undefined');
    const collections = databaseClient.listCollections();
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `collections-loaded`,
      },
      data: collections,
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

export default databaseListCollections;
