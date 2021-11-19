import { FEE_TYPES } from '../IFee';
import { WEB3_Driver } from './WEB3_Driver';
import axios from 'axios';

export class ETH_Driver extends WEB3_Driver {
  nativeAssetSymbol: string = 'ETH';
  getGasFeePrices = async () => {
    const config: object = {
      method: 'get',
      url: this.getFeeEndpoint(),
    };
    const response = await axios(config);
    const data = response.data;

    let prices: any = {};
    prices[FEE_TYPES.REGULAR] = data.average / 10;
    prices[FEE_TYPES.PRIORITY] = data.fast / 10;
    return prices;
  }
}
