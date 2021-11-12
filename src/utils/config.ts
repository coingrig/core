import * as MAINNET_CONFIG_DATA from './config.mainnet.json';
import * as TESTNET_CONFIG_DATA from './config.testnet.json';

interface IGENERIC_ENDPOINTS_MAP {
  [key: string]: string[];
}

export interface IGENERIC_ENDPOINTS {
  balance: any;
  fee: any;
  transaction: any;
  other?: IGENERIC_ENDPOINTS_MAP;
}

export interface CHAIN_ENDPOINTS_MAP {
  [key: string]: IGENERIC_ENDPOINTS;
}

export interface SERVICES_ENDPOINTS_MAP {
  [key: string]: string;
}

export interface IConfig {
  TESTNET: boolean;
  DEFAULT_DERIVATION_KEY: number;
  CHAIN_ENDPOINTS: CHAIN_ENDPOINTS_MAP;
  SERVICES_ENDPOINTS: SERVICES_ENDPOINTS_MAP;
}

const TESTNET = String(process.env.TESTNET) === 'true';
console.log(
  'TESTNET: ',
  process.env.TESTNET,
  TESTNET,
  typeof process.env.TESTNET,
  typeof TESTNET
);

const MAINNET_CONFIG: IConfig = MAINNET_CONFIG_DATA;
const TESTNET_CONFIG: IConfig = TESTNET_CONFIG_DATA;

export const CONFIG: IConfig = TESTNET ? TESTNET_CONFIG : MAINNET_CONFIG;
