import { createContext } from 'react';

const ObserverContext = createContext({
  database: {},
  provider: {},
});

export default ObserverContext;
