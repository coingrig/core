import { Currency } from '../../currencies';
import { EthereumFee } from './EthereumFee';

export class PolygonFee extends EthereumFee {
  currency = Currency.MATIC;
}
