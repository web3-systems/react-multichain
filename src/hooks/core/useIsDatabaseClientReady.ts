import useMultiChain from '../../useMultiChain';

function useIsDatabaseClientReady() {
  const { isDatabaseClientReady } = useMultiChain();
  return isDatabaseClientReady;
}

export default useIsDatabaseClientReady;
