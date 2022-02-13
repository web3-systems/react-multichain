import EvmAbi from '@ethersproject/abi';

export enum HookStatus {
  LOADING = 'LOADING',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface HookState {
  status: HookStatus;
  data?: any;
  err?: any;
  meta?: {
    msg: any;
    data?: any;
  };
}

export interface ChainsConfig {
  chainId: number;
  providerUrl?: string;
  scannerApiKey?: string;
  databaseOptions?: any;
}

export interface MultiChainProviderState {
  chains?: ChainsConfig[];
  isReady: any;
  isDatabaseClientReady: boolean;
  isProviderClientReady: boolean;
  isScannerClientReady: boolean;
}

export interface EntityContract {
  chainId: number;
  from: string;
  blockNumber: number;
  timestamp: number;
  address: string;
  abi: ABI;
  name: string;
  bytecode: string;
}

interface AccountChainMeta {
  chainId: number;
  balance: string;
  nonce: number;
  inbound: string;
  total: string;
  synced: number;
}

export interface EntityAccount {
  address: string;
  chainsActive: number[];
  chains: AccountChainMeta;
}

/**
 * > The JSON format for a contract’s interface is given by an array of function,
 * > event and error descriptions.
 * @see https://docs.soliditylang.org/en/develop/abi-spec.html#json
 * @internal
 */
export interface ABI extends Array<EvmAbi.JsonFragment> {}

export { EvmAbi as JsonFragment };
