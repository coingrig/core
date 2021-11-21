import { ERC20_ABI } from '../../constants';
import { weiToETH } from '../../currencyFunctions';
import { GenericBalance } from '../GenericBalance';
import { GenericBalanceDriver } from '../GenericBalanceDriver';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

export class WEB3_Driver extends GenericBalanceDriver {
  config: any;
  nativeCurrencySymbol: string = 'ETH';
  getBalance = async (address: string) => {
    if (this.currency === this.nativeCurrencySymbol) {
      return this.getNativeAssetBalance(address);
    } else {
      return this.getTokenBalance(address);
    }
  };
  getNativeAssetBalance = async (address: string) => {
    const provider = new Web3.providers.HttpProvider(this.getBalanceEndpoint());
    const client = new Web3(provider);
    let bnbBalance = await client.eth.getBalance(address);
    const confirmedBalance: number = Number(new BigNumber(bnbBalance));

    const value = Number(weiToETH(confirmedBalance.toString()));
    // console.log('value', value);
    return new GenericBalance(this.currency, value, 0);
  };
  getTokenBalance = async (address: string) => {
    if (this.assetConfig.decimals === null) {
      throw new Error(
        'Wallet decimals not set, can not retrieve balance without decimals!'
      );
    }
    const provider = new Web3.providers.HttpProvider(
      this.getTokenBalanceEndpoint()
    );
    const client = new Web3(provider);

    // The minimum ABI required to get the ERC20 Token balance
    const minABI: any = ERC20_ABI;

    const contract = new client.eth.Contract(
      minABI,
      this.assetConfig.contract!
    );

    const result = await contract.methods
      .balanceOf(address)
      .call({ from: address });

    const format = result;
    const value = Number(
      new BigNumber(format).div(10 ** this.assetConfig.decimals!)
    );

    return new GenericBalance(this.currency, value, 0);
  };
  getTokenBalanceEndpoint() {
    const endpoint = this.config.token_endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(
      this.currency + ' Balance token endpoint is required in config'
    );
  }
}
