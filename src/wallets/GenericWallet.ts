import { IWallet } from './IWallet';
import { GenericTxProposal } from '../fees/GenericTxProposal';
import { IWalletConfig } from './IWalletConfig';
import { CONFIG } from '../utils/config';
import { GenericBalance } from '../balances/GenericBalance';
import { Web3SigningManager } from './signing/web3';

/**
 * Don't use the generic wallet, for a new coin write an implementation
 */
export class GenericWallet implements IWallet {
  config: IWalletConfig;
  address: any = null;
  currency: string | null;
  signingManager: Web3SigningManager | null = null;

  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {};

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {};

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {};

  //
  constructor(config: IWalletConfig) {
    this.address = config.walletAddress;
    this.config = config;
    this.currency = this.config.symbol;
    this.signingManager = null;
  }
  //
  getDecimals = async (): Promise<number | null> => {
    if (this.config.decimals === null) {
      throw new Error('Wallet decimals not set!');
    }
    return this.config.decimals;
  };
  getAddress = () => {
    if (!this.address) {
      throw new Error('Wallet address not set!');
    }
    return this.address;
  };
  getPrivateKey = () => {
    if (!this.config.privKey) {
      throw new Error('Wallet private key not set!');
    }
    return this.config.privKey;
  };
  getCurrencyName = async (): Promise<string | null> => {
    if (!this.config.symbol) {
      throw new Error('Wallet currency not set!');
    }
    return this.config.symbol;
  };
  getCurrencySymbol = async (): Promise<string | null> => {
    if (!this.config.symbol) {
      throw new Error('Wallet currency not set!');
    }
    return this.config.symbol;
  };
  getBlockchainSymbol = () => {
    if (!this.config.chain) {
      throw new Error('Wallet blockchain not set!');
    }
    return this.config.chain;
  };
  getSigningManager() {
    return this.signingManager;
  }
  // End of common functions
  getBalance = async () => {
    // Loop through the drivers to get the balance
    let drivers =
      CONFIG.CHAIN_ENDPOINTS[this.getBlockchainSymbol()]?.balance ?? [];
    for (let i = 0; i < drivers.length; i++) {
      // Try all drivers in case one of them fails
      const driverDescription: any = drivers[i];
      try {
        var driver = new this.BALANCE_DRIVER_NAMESPACE[
          driverDescription.driver
        ](this.config, driverDescription.config);
        let balance = await driver.getBalance(this.getAddress());
        if (balance) {
          return balance;
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(e);
        }
        continue;
      }
    }
    let currencySymbol = await this.getCurrencySymbol();
    if (!currencySymbol) {
      throw new Error(
        'Unable to retrieve balance for a contract without a currency symbol!'
      );
    }
    return new GenericBalance(currencySymbol, 0, 0);
  };
  // This is a send currency transaction
  getTxSendProposals = async (destination: string, valueToSend: any) => {
    // Loop through the drivers to get the fees
    let drivers = CONFIG.CHAIN_ENDPOINTS[this.getBlockchainSymbol()]?.fee ?? [];
    for (let i = 0; i < drivers.length; i++) {
      // Try all drivers in case one of them fails
      const driverDescription: any = drivers[i];
      try {
        var driver = new this.FEES_DRIVER_NAMESPACE[driverDescription.driver](
          this.config,
          driverDescription.config
        );
        if (typeof driver.getTxSendProposals !== 'function') {
          continue;
        }
        let fees = await driver.getTxSendProposals(destination, valueToSend);
        if (fees) {
          return fees;
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(e);
        }
        continue;
      }
    }
    return null;
  };

  postTxSend = async (transactionProposal: GenericTxProposal): Promise<any> => {
    // Loop through the drivers to get the fees
    let drivers =
      CONFIG.CHAIN_ENDPOINTS[this.getBlockchainSymbol()]?.transaction ?? [];
    for (let i = 0; i < drivers.length; i++) {
      // Try all drivers in case one of them fails
      const driverDescription: any = drivers[i];
      try {
        var driver = new this.TRANSACTION_DRIVER_NAMESPACE[
          driverDescription.driver
        ](this.config, driverDescription.config);
        let tx = await driver.send(transactionProposal);
        return tx;
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(e);
        }
        continue;
      }
    }
    return null;
  };

  postRawTxSend = async (transaction: any): Promise<any> => {
    // Loop through the drivers to get the fees
    let drivers =
      CONFIG.CHAIN_ENDPOINTS[this.getBlockchainSymbol()]?.transaction ?? [];
    for (let i = 0; i < drivers.length; i++) {
      // Try all drivers in case one of them fails
      const driverDescription: any = drivers[i];
      try {
        var driver = new this.TRANSACTION_DRIVER_NAMESPACE[
          driverDescription.driver
        ](this.config, driverDescription.config);
        let tx = await driver.sendRaw(transaction);
        return tx;
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(e);
        }
        continue;
      }
    }
    return null;
  };
}
