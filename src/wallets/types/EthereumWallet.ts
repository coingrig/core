import { Currency } from '../../currencies';
import { GenericWallet } from '../GenericWallet';

import { ETH_Driver } from '../../fees/drivers/ETH_Driver';
import {ETH_Driver as ETH_Transaction_Driver} from '../../transactions/drivers/ETH_Driver';
import {ETH_Driver as ETH_Balance_Driver} from '../../balances/drivers/ETH_Driver';


export class EthereumWallet extends GenericWallet {
  currency = Currency.ETH;
  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'ETH_Driver': ETH_Transaction_Driver
    }

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'ETH_Driver': ETH_Driver
  }

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'ETH_Driver': ETH_Balance_Driver
  }
}
