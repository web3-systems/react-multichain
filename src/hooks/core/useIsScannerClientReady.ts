import useMultiChain from '../../useMultiChain';

function useIsScannerClientReady() {
  const { isScannerClientReady } = useMultiChain();
  return isScannerClientReady;
}

export default useIsScannerClientReady;
