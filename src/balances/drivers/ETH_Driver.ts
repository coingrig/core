import axios from 'axios';
import { UA } from '../../constants';
import { weiToETH } from '../../currencyFunctions';
import { GenericBalance } from '../GenericBalance';
import { WEB3_Driver } from './WEB3_Driver';
import BigNumber from 'bignumber.js';

export class ETH_Driver extends WEB3_Driver {
  config: any;
  nativeCurrencySymbol: string = 'ETH';
  getNativeAssetBalance = async (address: string) => {
    const url = this.getBalanceEndpoint() + address + '?details=basic';
    const param: object = {
      method: 'get',
      url: url,
      headers: {
        'User-Agent': UA,
      },
    };
    const response = await axios(param);

    const confirmedBalance: number = Number(
      new BigNumber(response.data.balance)
    );
    const unconfirmedBalance: number = Number(
      new BigNumber(response.data.unconfirmedBalance)
    );
    return new GenericBalance(
      this.currency,
      Number(weiToETH(confirmedBalance.toString())),
      Number(weiToETH(unconfirmedBalance.toString()))
    );
  };
}
