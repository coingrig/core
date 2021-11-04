import { Currency } from '../currencies';

export const FEE_TYPES = {
  REGULAR: 'regular',
  PRIORITY: 'priority',
}

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
  currency: Currency;
  getTxSendProposals(address: string, privKey: any, destination: string, valueToSend: number, currency?: Currency): Promise<IFeeMap>;
}
