import { GenericWallet } from '../GenericWallet';

import {BTC_Driver} from '../../fees/drivers/BTC_Driver';
import {BTC_Driver as BTC_Transaction_Driver} from '../../transactions/drivers/BTC_Driver';
import {BTC_Driver as BTC_Balance_Driver} from '../../balances/drivers/BTC_Driver';


export class BitcoinWallet extends GenericWallet {
  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'BTC_Driver': BTC_Transaction_Driver
  }

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'BTC_Driver': BTC_Driver
  }

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any
  } = {
    'BTC_Driver': BTC_Balance_Driver
  }
}
