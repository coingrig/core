import { IFee } from './IFee';
import { Currency } from '../currencies';

export class GenericTxProposal implements IFee {
  currency = Currency.BTC;
  settings = {};
  getFeeValue() {
    return 0;
  }
  getData() {
    return {};
  }
}
