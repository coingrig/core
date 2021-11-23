import { Currency } from '../../currencies';
import { EthereumFee } from './EthereumFee';

export class BnbFee extends EthereumFee {
  currency = Currency.BNB;
}
