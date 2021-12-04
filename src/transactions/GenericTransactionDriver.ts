import { IWalletConfig } from '..';
import { GenericTxProposal } from '../fees/GenericTxProposal';

export class GenericTransactionDriver {
  currency: string;
  assetConfig: IWalletConfig;
  config: any;
  constructor(assetConfig: any, config?: any) {
    this.config = config;
    this.assetConfig = assetConfig;
    this.currency = assetConfig.symbol;
  }
  send = async (_transaction: GenericTxProposal): Promise<any> => {
    return null;
  };
  sendRaw = async (_transaction: any): Promise<any> => {
    return null;
  };
}
