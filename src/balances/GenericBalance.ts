import { IBalance } from './IBalance';
import BigNumber from 'bignumber.js';

export class GenericBalance implements IBalance {
  currency: string = '';
  value = 0;
  unconfirmedBalance = 0;
  confirmedBalance = 0;

  constructor(
    currency: string,
    confirmedBalance: number,
    unconfirmedBalance: number
  ) {
    this.currency = currency;
    this.value = Number(
      new BigNumber(confirmedBalance).plus(new BigNumber(unconfirmedBalance))
    );
    this.confirmedBalance = confirmedBalance;
    this.unconfirmedBalance = unconfirmedBalance;
  }
  getValue() {
    return this.value;
  }
  getConfirmedBalance() {
    return this.confirmedBalance;
  }
  getUnconfirmedBalance() {
    return this.unconfirmedBalance;
  }
}
