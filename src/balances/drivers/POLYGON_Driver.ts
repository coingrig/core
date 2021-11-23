import { WEB3_Driver } from './WEB3_Driver';

export class POLYGON_Driver extends WEB3_Driver {
  config: any;
  nativeCurrencySymbol: string = 'MATIC';
  getTokenBalanceEndpoint() {
    return this.getBalanceEndpoint();
  }
}
