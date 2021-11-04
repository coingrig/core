export interface IBalance {
  currency: string;  
  getValue(): number;
  getUnconfirmedBalance(): number;
}

export interface IBalanceDriver {
  currency: string;  
  getBalance(address: string): Promise<IBalance>;
}
