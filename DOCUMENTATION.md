# Multichain Database

![CI](https://github.com/web3-systems/react-multichain/actions/workflows/main.yml/badge.svg)
![TS](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
[![Version](https://img.shields.io/npm/v/@web3-systems/react-multichain.svg)](https://npmjs.org/package/@web3-systems/react-multichain)
[![Downloads/week](https://img.shields.io/npm/dw/@web3-systems/react-multichain.svg)](https://npmjs.org/package/@web3-systems/react-multichain)

### 💾 Installation

```sh
npm install @web3-systems/multichain-database
```

```sh
yarn add @web3-systems/multichain-database
```

```sh
git clone https://github.com/web3-systems/multichain-database
```

### 🏎️ &nbsp;Quickstart


```tsx
import * as React from 'react';
import { 
  MultiChainProvider, 
  useInitializeDefaultCollections, 
  useGetAccountTransactions 
} from '@web3-systems/react-multichain';

export const Transactions = () => { 
  const { 
    status, 
    data, 
    meta 
  } = useGetAccountTransactions('0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f', 'from', 1);
  return(
    <div>
        <TransactionsTable data={data} />
    </div>
  )
}

export const Contracts = () => { 
  const { 
    status, 
    data, 
    meta 
  } = useGetContractABI('0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe', 1);
  return(
      <div>
          {status === 'LOADING' && return <span>Loading...</span>}
          <ContractRender abi={data} />
      </div>
  )
}

const InnerProvider = ({children}) => { 
  const isReady = useInitializeDefaultCollections(1)
  return(
    <div>
      {isReady && children}
      {!isReady && <div>Loading...</div>}
    </div>
  )
}

export const Providers = () => {
  const chains = [{
    chainId: 1,
    providerUrl: 'https://mainnet.infura.io/v3/INFURA_API_KEY',
    scannerApiKey: 'ETHERSCAN_API_KEY'
  }]

  return (
    <MultiChainProvider chains={chains}>
      <InnerProvider>
        <Transactions />
        <Contracts />
      </InnerProvider>
    </MultiChainProvider>
  );
};


### 📖 &nbsp;Overview

Coming soon...

### 🧩 &nbsp;Examples
Coming soon...

### 💻 &nbsp;Developer Experience

The package is setup using the [TSDX zero-config CLI](https://tsdx.io/) which includes:

- Typescript
- Rollup
- Jest
- Prettier
- ESLint
