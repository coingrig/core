import axios from 'axios';
import { ERC20_ABI, UA } from '../../constants';
import { weiToETH } from '../../currencyFunctions';
import { GenericBalance } from '../GenericBalance';
import { GenericBalanceDriver } from '../GenericBalanceDriver';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

export class ETH_Driver extends GenericBalanceDriver {
  config: any;  
  getBalance = async (address: string) => {
    if (this.currency === 'ETH') {
      const url = this.getBalanceEndpoint() + address + '?details=basic';
      const param: object = {
        method: 'get',
        url: url,
        headers: {
          'User-Agent': UA,
        },
      };
      const response = await axios(param);

      console.log('response.data.balance', response.data.balance)
      //
      const confirmedBalance: number = Number(new BigNumber(response.data.balance));
      const unconfirmedBalance: number = Number(new BigNumber(response.data.unconfirmedBalance));
      return new GenericBalance(this.currency, Number(weiToETH(confirmedBalance.toString())), Number(weiToETH(unconfirmedBalance.toString())));
    } else {
      if (this.assetConfig.decimals === null) {
        throw new Error('Wallet decimals not set, can not retrieve balance without decimals!')
      }
      const provider = new Web3.providers.HttpProvider(this.getTokenBalanceEndpoint());
      const client = new Web3(provider);

      // The minimum ABI required to get the ERC20 Token balance
      const minABI: any = ERC20_ABI;       

      const contract = new client.eth.Contract(minABI, this.assetConfig.contract!);

      const result = await contract.methods.balanceOf(address).call(
        {from: address}
      );
      
      const format = result;
      const value = Number((new BigNumber(format)).div(10 ** this.assetConfig.decimals!));
        
      return new GenericBalance(this.currency, value, 0);
    }
  }
  getTokenBalanceEndpoint() {
    const endpoint = this.config.token_endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(this.currency + " Balance currency is required in config");
  }
}
