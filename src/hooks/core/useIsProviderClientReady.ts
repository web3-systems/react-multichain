import useMultiChain from '../../useMultiChain';

function useIsProviderClientReady() {
  const { isProviderClientReady } = useMultiChain();
  return isProviderClientReady;
}

export default useIsProviderClientReady;
