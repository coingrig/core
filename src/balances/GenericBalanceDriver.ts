import { IBalanceDriver } from './IBalance';
import { GenericBalance } from './GenericBalance';
import { IWalletConfig } from '../wallets/IWalletConfig';

export class GenericBalanceDriver implements IBalanceDriver {
  currency: string;
  assetConfig: IWalletConfig;
  config: any;
  constructor(assetConfig: IWalletConfig, config?: any) {
    this.config = config;
    this.assetConfig = assetConfig;
    this.currency = assetConfig.symbol;
  }
  getBalance = async (_address: string) => {
    return new GenericBalance(this.currency, 0, 0);
  }
  getBalanceEndpoint() {
    const endpoint = this.config.endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(this.currency + " Balance currency is required in config");
  }
}
