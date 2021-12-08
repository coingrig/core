import { IBalanceDriver } from './IBalance';
import { GenericBalance } from './GenericBalance';

export class GenericBalanceDriver implements IBalanceDriver {
  currency: string;
  assetConfig: any;
  config: any;
  constructor(assetConfig: any, config?: any) {
    this.config = config;
    this.assetConfig = assetConfig;
    this.currency = assetConfig.symbol;
  }
  getBalance = async (_address: string) => {
    return new GenericBalance(this.currency, 0, 0);
  };
  getBalanceEndpoint() {
    const endpoint = this.config.endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(
      this.currency + ' Balance currency endpoint is required in config'
    );
  }
}
