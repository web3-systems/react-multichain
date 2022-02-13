function addCallback(options: any = {}, callback: Function, chainId: number) {
  const calling = (() => callback(chainId))();
  return {
    ...options,
    autoloadCallback: calling,
  };
}

function createChainOptionsWithCallbacks(chains: Array<any>, callback: any) {
  return chains.map(chain => {
    return {
      ...chain,
      databaseOptions: addCallback(
        chain.databaseOptions,
        callback,
        chain.chainId
      ),
    };
  });
}

export default createChainOptionsWithCallbacks;
