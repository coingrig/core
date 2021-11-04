require('dotenv').config()
export { Currency } from './currencies';
export { Chains } from './chains';
export { WalletFactory } from './walletFactory';
export { IWalletConfig } from './wallets/IWalletConfig';
export { WalletGenerator } from './walletGenerator';
export { IConfig, CONFIG } from './utils/config';

import * as Generators from './generators';
export {Generators}; 

import * as Balances from './balances';
export {Balances}; 

import * as Fees from './fees';
export {Fees}; 

import * as Transactions from './transactions';
export {Transactions}; 

import * as CurrencyFunctionsfrom from './currencyFunctions';
export {CurrencyFunctionsfrom}; 

export { getAllCoins, getCoins } from './market/getCoins';