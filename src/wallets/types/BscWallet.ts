import { BSC_Driver } from '../../fees/drivers/BSC_Driver';
import { BSC_Driver as BSC_Transaction_Driver } from '../../transactions/drivers/BSC_Driver';
import { BSC_Driver as BSC_Balance_Driver } from '../../balances/drivers/BSC_Driver';

import { EthereumWallet } from './EthereumWallet';

export class BscWallet extends EthereumWallet {
  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    BSC_Driver: BSC_Transaction_Driver,
  };

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    BSC_Driver: BSC_Driver,
  };

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    BSC_Driver: BSC_Balance_Driver,
  };
}
