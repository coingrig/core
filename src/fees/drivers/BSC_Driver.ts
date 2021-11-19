import { FEE_TYPES } from '../IFee';
import { WEB3_Driver } from './WEB3_Driver';
import { BnbFee } from "../types/BnbFee";
import axios from 'axios';

export class BSC_Driver extends WEB3_Driver {
  nativeAssetSymbol: string = 'BNB';

  getGasFeePrices = async () => {
    const config: object = {
      method: 'get',
      url: this.getFeeEndpoint(),
    };
    const response = await axios(config);
    const data = response.data.result;

    let prices: any = {};
    prices[FEE_TYPES.REGULAR] = data.SafeGasPrice;
    prices[FEE_TYPES.PRIORITY] = data.FastGasPrice;
    return prices;
  }

  buildFee = (proposal: any) => {
    return new BnbFee(proposal);
  }
  
}