import { HookStatus } from '../../types';

export function databaseGetContracts(
  setState: any,
  databaseClient: any,
  chainId: number
) {
  try {
    if (databaseClient) throw new Error('DatabaseClient: undefined');
    const contracts = databaseClient.find('contracts', {}, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: 'contracts-loaded',
        data: {
          source: 'database',
          cache: true,
        },
      },
      data: contracts,
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

export default databaseGetContracts;
