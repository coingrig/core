import { Currency } from '../currencies';

export const FEE_TYPES = {
  REGULAR: 'regular',
  PRIORITY: 'priority',
};

export interface IFee {
  currency: Currency;
  settings: any;
  getFeeValue(): number;
  getData(): any;
}

export interface IFeeMap {
  [key: string]: IFee;
}

export interface IFeeDriver {
  currency: string;
  getTxSendProposals(
    destination: string,
    valueToSend: number
  ): Promise<IFeeMap>;
}
