import { Chains } from './chains';
import { IWalletConfig } from './wallets/IWalletConfig';
import { BitcoinWallet } from './wallets/types/BitcoinWallet';
import { EthereumWallet } from './wallets/types/EthereumWallet';
/**
 * Implements the Factory pattern to help generate easily wallets
 * for the supported blockchains.
 *
 * @export
 * @class WalletFactory
 */
export class WalletFactory {
  /**
   * Instantiates a wallet for the specified blockchain configuration options
   * Currently supports only BTC and ETH.
   *
   * @static
   * @param {IWalletConfig} config
   * @throws {Error} If config specifies an unsupported blockchain
   * @memberof WalletFactory
   */
  static getWallet = (config: IWalletConfig) => {
    let chain = config.chain;
    let wallet = null;
    switch (chain) {
      case Chains.BTC:
        wallet = new BitcoinWallet(config);
        break;
      case Chains.ETH:
        wallet = new EthereumWallet(config);
        break;
      default:
        throw new Error('Unsupported wallet blockchain');
    }
    return wallet;
  };
}
