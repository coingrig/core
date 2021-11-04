import { IBalanceDriver } from './IBalance';
import { GenericBalance } from './GenericBalance';
import { Currency } from '../currencies';

export class GenericBalanceDriver implements IBalanceDriver {
  currency = Currency.BTC.toString();
  config: any;
  constructor(config?: any) {
    this.config = config;
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
