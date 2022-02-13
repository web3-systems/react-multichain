import nestedProperty from 'nested-property';

export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'IS_READY':
      return {
        ...state,
        isReady: action.payload,
      };
    case 'IS_DATABASE_CLIENT_READY':
      return {
        ...state,
        isDatabaseClientReady: action.payload,
      };
    default:
      return state;
  }
}

export function reducerObserver(draft: any, action: any) {
  switch (action.type) {
    case 'SET_PROVIDER_OBSERVER':
      return draft;
    case 'INIT_DATABASE_OBSERVER':
      draft.database[action.payload.chainId] = {
        accounts: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
        contracts: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
        transactions: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
        transactionsScanner: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
        receipts: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
        logs: {
          insert: 0,
          update: 0,
          remove: 0,
          findAndUpdate: 0,
          findAndRemove: 0,
        },
      };
      break;
    case 'SET_DATABASE_OBSERVER':
      nestedProperty.set(
        draft,
        `database.${action.payload.chainId}.${action.payload.collection}.${action.payload.event}`,
        action.payload.data
      );
      break;
    default:
      return draft;
  }
}

export default {
  reducerMultiChain: reducer,
  reducerObserver: reducerObserver,
};
