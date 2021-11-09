import { IFeeDriver } from './IFee';
import { IWalletConfig } from '..';

export class GenericDriver implements IFeeDriver {
  assetConfig: IWalletConfig;
  currency: string;
  config: any;
  constructor(assetConfig: any, config?: any) {
    this.config = config;
    this.assetConfig = assetConfig;
    this.currency = assetConfig.symbol;
  }
  getTxSendProposals = async (_destination: string, _valueToSend: number) => {
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
