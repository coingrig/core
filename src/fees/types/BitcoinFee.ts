import { GenericTxProposal } from "../GenericTxProposal";
import { Currency } from '../../currencies';
import { SATOSHI } from "../../constants";
import BigNumber from 'bignumber.js';

export class BitcoinFee extends GenericTxProposal {
  currency = Currency.BTC;
  settings: {
    value: number;
    proposal: any;
  } = {
      value: 0,
      proposal: null,
    };
  constructor(value: number, settings: any) {
    super();
    this.settings = {
      value: value,
      proposal: settings,
    };
  }
  getFeeValue() {
    return (new BigNumber(this.settings.value)).dividedBy(new BigNumber(SATOSHI)).toNumber();
  }
  getData() {
    return this.settings.proposal;
  }
}
