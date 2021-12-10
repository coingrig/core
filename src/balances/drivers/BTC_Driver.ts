import { GenericBalanceDriver } from '../GenericBalanceDriver';
import { GenericBalance } from '../GenericBalance';
import axios from 'axios';
import { GENERIC_REQUEST_THROTTLE_DELAY, UA } from '../../constants';
import { satoshi_to_btc } from '../../currencyFunctions';
import BigNumber from 'bignumber.js';

export class BTC_Driver extends GenericBalanceDriver {
  config: any;
  getBalance = async (address: string) => {
    let endpoints = this.getBalanceEndpoint();
    for (let i = 0; i < endpoints.length; i++) {
      let endpoint = endpoints[i];
      const url = endpoint + address + '?details=basic';
      const param: object = {
        method: 'get',
        url: url,
        headers: {
          'User-Agent': UA,
        },
        timeout: 1000,
      };
      try {
        const response = await axios(param);
        if (response.data.balance && response.data.unconfirmedBalance) {
          let balanceSet = {
            balance: response.data.balance,
            unconfirmedBalance: response.data.unconfirmedBalance,
          };
          const confirmedBalance: number = Number(
            new BigNumber(balanceSet.balance)
          );
          const unconfirmedBalance: number = Number(
            new BigNumber(balanceSet.unconfirmedBalance)
          );

          return new GenericBalance(
            this.currency,
            satoshi_to_btc(confirmedBalance),
            satoshi_to_btc(unconfirmedBalance)
          );
        }
      } catch (e) {}
      await new Promise(resolve =>
        setTimeout(resolve, GENERIC_REQUEST_THROTTLE_DELAY)
      );
    }
    throw new Error('Unable to retrieve balance!');
  };

  getBalanceEndpoint() {
    let endpoints = [];
    if (this.config.endpoint) {
      if (!Array.isArray(this.config.endpoint)) {
        endpoints = [this.config.endpoint];
      } else {
        endpoints = this.config.endpoint;
      }
      return endpoints;
    }
    throw new Error(
      this.currency + ' Balance currency endpoint is required in config'
    );
  }
}
