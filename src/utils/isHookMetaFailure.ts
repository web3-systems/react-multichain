import { HookState, HookStatus } from '..';

function isHookMetaFailure(meta: HookState): boolean {
  return meta.status === HookStatus.SUCCESS;
}

export default isHookMetaFailure;
