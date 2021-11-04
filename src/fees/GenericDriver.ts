import { IFeeDriver } from './IFee';
import { Currency } from '../currencies';

export class GenericDriver implements IFeeDriver {
  currency = Currency.ETH;
  config: any;
  constructor(config?: any) {
    this.config = config;
  }
  getTxSendProposals = async (_address: string, _privKey: string, _destination: string, _valueToSend: number, _currency = this.currency) => {
    return {}
  }
  getFeeEndpoint() {
    const endpoint = this.config.endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(this.currency + " Balance currency is required in config");
  }
}
