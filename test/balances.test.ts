import { Balances, IWalletConfig } from '../dist';
import { CONFIG } from '../dist';
import { BTC_ADDRESS_SENDER, ETH_ADDRESS_SENDER } from './fixtures';

const BTC_DESCRIPTOR: IWalletConfig = {
  symbol: 'BTC',
  name: 'Bitcoin',
  chain: 'BTC',
  type: 'coin',
  decimals: 8,
  contract: null,
  walletAddress: null,
  privKey: null
}

const ETH_DESCRIPTOR: IWalletConfig = {
  symbol: 'ETH',
  name: 'Ethereum',
  chain: 'BTC',
  type: 'ETH',
  decimals: 18,
  contract: null,
  walletAddress: null,
  privKey: null
}

describe('Balances', () => {
  it('can_get_btc_balance', async () => {
    let from = BTC_ADDRESS_SENDER;
    let driver = new Balances.BTC_Driver(BTC_DESCRIPTOR, CONFIG.CHAIN_ENDPOINTS.BTC.balance[0].config);
    let balance = await driver.getBalance(from);
    expect(typeof balance).toBe('object');
    expect(balance.getValue()).toBeGreaterThan(0);
  });

  it('can_get_eth_balance', async () => {
    let from = ETH_ADDRESS_SENDER;
    let driver = new Balances.ETH_Driver(ETH_DESCRIPTOR, CONFIG.CHAIN_ENDPOINTS.ETH.balance[0].config);
    let balance = await driver.getBalance(from);
    expect(typeof balance).toBe('object');
    expect(balance.getValue()).toBeGreaterThan(0);
    // console.log('ETH', balance.getValue());
  });
});
