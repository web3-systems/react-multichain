import { MultichainInMemoryDBClient } from '@web3-systems/multichain-database';

import { HookStatus } from '../../types';

export function databaseInsert(
  client: MultichainInMemoryDBClient,
  collection: string,
  document: any,
  chainId: number,
  setState: any
) {
  try {
    if (!client) throw new Error('DatabaseClient Undefined');
    const _document = client.insert(collection, document, chainId);
    setState({
      status: HookStatus.SUCCESS,
      meta: {
        msg: `${collection}-insert`,
      },
      data: _document,
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

export default databaseInsert;
