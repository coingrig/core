import { POLYGON_Driver } from '../../fees/drivers/POLYGON_Driver';
import { POLYGON_Driver as POLYGON_Transaction_Driver } from '../../transactions/drivers/POLYGON_Driver';
import { POLYGON_Driver as POLYGON_Balance_Driver } from '../../balances/drivers/POLYGON_Driver';

import { EthereumWallet } from './EthereumWallet';

export class PolygonWallet extends EthereumWallet {
  TRANSACTION_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    POLYGON_Driver: POLYGON_Transaction_Driver,
  };

  FEES_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    POLYGON_Driver: POLYGON_Driver,
  };

  BALANCE_DRIVER_NAMESPACE: {
    [key: string]: any;
  } = {
    POLYGON_Driver: POLYGON_Balance_Driver,
  };
}
