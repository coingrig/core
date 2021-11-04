import { GenericBalanceDriver } from '../GenericBalanceDriver';
import { GenericBalance } from '../GenericBalance';
import { Currency } from '../../currencies';
import axios from 'axios';
import { UA } from '../../constants';
import { satoshi_to_btc } from '../../currencyFunctions';
import BigNumber from 'bignumber.js';

export class BTC_Driver extends GenericBalanceDriver {
  currency = Currency.BTC;
  config: any;  
  getBalance = async (address: string) => {
    const url = this.getBalanceEndpoint() + address + '?details=basic';
    const param: object = {
      method: 'get',
      url: url,
      headers: {
        'User-Agent': UA,
      },
    };
    const response = await axios(param);
    // TODO: Check valid reply
    const confirmedBalance: number = Number(new BigNumber(response.data.balance));
    const unconfirmedBalance: number = Number(new BigNumber(response.data.unconfirmedBalance));
    return new GenericBalance(this.currency, satoshi_to_btc(confirmedBalance), satoshi_to_btc(unconfirmedBalance));
  }
}
