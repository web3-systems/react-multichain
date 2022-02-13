import * as React from 'react';

import Context from './MultiChainContext';

function useMultiChain(): React.ContextType<typeof Context> {
  return React.useContext(Context);
}

export default useMultiChain;
