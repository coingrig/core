import { SATOSHI } from './constants';
import BigNumber from 'bignumber.js';
import { fromWei, isAddress } from 'web3-utils';

export const btc_to_satoshi = (btcValue: any) => {
  return Number(
    new BigNumber(btcValue)
      .multipliedBy(SATOSHI)
      .toFixed(8, BigNumber.ROUND_FLOOR)
  );
};

export const satoshi_to_btc = (satoshiValue: any) => {
  return Number(new BigNumber(satoshiValue).dividedBy(SATOSHI));
};

export const weiToETH = (amount: string) => {
  return fromWei(amount, 'ether');
};

export const isETHAddress = (address: string) => {
  return isAddress(address);
};
