import { HookState, HookStatus } from '..';

function isHookMetaSuccess(meta: HookState): boolean {
  return meta.status === HookStatus.SUCCESS;
}

export default isHookMetaSuccess;
