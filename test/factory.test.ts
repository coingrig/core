import { WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { IWalletConfig } from '../dist';
import { MNEMONIC } from './fixtures';

let mnemonic = MNEMONIC;

describe('WalletFactory', () => {

  it('can_get_btc_wallet', async () => {
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(Chains.BTC, xpub, 0);

    let config: IWalletConfig = {
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: 'BTC', 
      type: 'coin',
      decimals: 8,
      contract: null,
      options: {
        testnet: true,
      },
      walletAddress: address,
      privKey: null,
    }

    let wallet = WalletFactory.getWallet(config);
    expect(typeof wallet).toBe('object');
    expect(wallet.getAddress()).toBe(address);
  });

  it('can_get_eth_wallet', async () => {
    let xpub = await WalletGenerator.generateWalletXpub(Chains.ETH, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(Chains.ETH, xpub, 0);

    let config: IWalletConfig = {
      symbol: 'ETH',
      name: 'Ethereum',
      chain: 'ETH', 
      type: 'coin',
      decimals: 8,
      contract: null,
      options: {
        testnet: true,
      },
      walletAddress: address,
      privKey: null,
    }

    let wallet = WalletFactory.getWallet(config);
    expect(typeof wallet).toBe('object');
    expect(wallet.getAddress()).toBe(address);
  });

  it('throws_unhandled_chain', async () => {
    try {

      let config: IWalletConfig = {
        symbol: 'ETH',
        name: 'Ethereum',
        chain: 'MATIC', 
        type: 'coin',
        decimals: 8,
        contract: null,
        options: {
          testnet: true,
        },
        walletAddress: null,
        privKey: null,
      }

      WalletFactory.getWallet(config);
    } catch (e: any) {
      expect (e.toString()).toEqual('Error: Unsupported wallet blockchain');
    }
  });

});
