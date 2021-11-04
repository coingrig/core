import { Currency } from '../currencies';
import { GenericTxProposal } from '../fees/GenericTxProposal';

export class GenericTransactionDriver {
  currency = Currency.BTC;
  config: any;
  constructor(config?: any) {
    this.config = config;
  }
  send = async (_transaction: GenericTxProposal) : Promise<any> => {    
    return null;
  }
}
