import axios from 'axios';
import { UA } from '../../constants';
import { Currency } from '../../currencies';
import { weiToETH } from '../../currencyFunctions';
import { GenericBalance } from '../GenericBalance';
import { GenericBalanceDriver } from '../GenericBalanceDriver';
import BigNumber from 'bignumber.js';

export class ETH_Driver extends GenericBalanceDriver {
  currency = Currency.ETH;
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
    return new GenericBalance(this.currency, Number(weiToETH(confirmedBalance.toString())), Number(weiToETH(unconfirmedBalance.toString())));
  }
}
