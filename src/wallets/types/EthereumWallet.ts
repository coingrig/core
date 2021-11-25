import { GenericWallet } from '../GenericWallet';

import { ETH_Driver } from '../../fees/drivers/ETH_Driver';
import { ETH_Driver as ETH_Transaction_Driver } from '../../transactions/drivers/ETH_Driver';
import { ETH_Driver as ETH_Balance_Driver } from '../../balances/drivers/ETH_Driver';
import Web3 from 'web3';
import { ERC20_ABI } from '../../constants';
import { CONFIG } from '../../utils/config';
import BigNumber from 'bignumber.js';

export class EthereumWallet extends GenericWallet {
  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    ETH_Driver: ETH_Transaction_Driver,
  };

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    ETH_Driver: ETH_Driver,
  };

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    ETH_Driver: ETH_Balance_Driver,
  };

  getWeb3Client() {
    let drivers =
      CONFIG.CHAIN_ENDPOINTS[this.getBlockchainSymbol()]?.balance ?? [];
    if (drivers.length === 0) {
      throw new Error('Can not retrieve decimals without a balance driver!');
    }
    let driverDescription = drivers[0];
    let driver = new this.BALANCE_DRIVER_NAMESPACE[driverDescription.driver](
      this.config,
      driverDescription.config
    );
    const provider = new Web3.providers.HttpProvider(
      driver.getTokenBalanceEndpoint()
    );
    const client = new Web3(provider);
    return client;
  }

  getDecimals = async (): Promise<number | null> => {
    if (this.config.decimals === null) {
      // Retrieve decimals information
      if (!this.config.contract) {
        throw new Error(
          'Wallet decimals not set, can not retrieve them without contract address!'
        );
      }
      const client = this.getWeb3Client();
      // The minimum ABI required to get the ERC20 Token balance
      const minABI: any = ERC20_ABI;
      const contract = new client.eth.Contract(minABI, this.config.contract!);
      const result = await contract.methods.decimals().call();
      const decimals = Number(new BigNumber(result));
      this.config.decimals = decimals;
    }
    return this.config.decimals;
  };

  getCurrencySymbol = async (): Promise<string | null> => {
    if (this.config.symbol === null) {
      // Retrieve decimals information
      if (!this.config.contract) {
        throw new Error(
          'Wallet decimals not set, can not retrieve them without contract address!'
        );
      }
      const client = this.getWeb3Client();
      // The minimum ABI required to get the ERC20 Token balance
      const minABI: any = ERC20_ABI;
      const contract = new client.eth.Contract(minABI, this.config.contract!);
      const result = await contract.methods.symbol().call();
      this.config.symbol = result;
    }
    return this.config.symbol;
  };

  getCurrencyName = async (): Promise<string | null> => {
    if (this.config.name === null) {
      // Retrieve decimals information
      if (!this.config.contract) {
        throw new Error(
          'Wallet decimals not set, can not retrieve them without contract address!'
        );
      }
      const client = this.getWeb3Client();
      // The minimum ABI required to get the ERC20 Token balance
      const minABI: any = ERC20_ABI;
      const contract = new client.eth.Contract(minABI, this.config.contract!);
      const result = await contract.methods.name().call();
      this.config.name = result;
    }
    return this.config.name;
  };
}
