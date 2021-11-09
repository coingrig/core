/**
 * The configuration of a wallet
 *
 * @export
 * @interface IWalletConfig
 * @property {string} symbol Official symbol
 * @property {string} name Display name
 * @property {string} chain Blockchain type
 * @property {string} type 
 * @property {null|number} decimals
 * @property {null|string} contract Contract address if it is a token
 * @property {*} options
 * @property {null|string} walletAddress The wallet address for this chain
 * @property {null|string} privKey The private key used for transaction signing
 */
export interface IWalletConfig {
  symbol: string;
  name: string;
  chain: string;
  type: string;
  decimals: null | number;
  contract: null | string;
  options?: {
    testnet?: boolean;
  };
  walletAddress: null | string;
  privKey: null | string;
}
