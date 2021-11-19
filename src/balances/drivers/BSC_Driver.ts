import { WEB3_Driver } from './WEB3_Driver';

export class BSC_Driver extends WEB3_Driver {
  config: any;  
  nativeCurrencySymbol: string = 'BNB'
  getTokenBalanceEndpoint() {
    return this.getBalanceEndpoint();    
  }
}
