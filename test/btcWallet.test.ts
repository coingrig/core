import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { MNEMONIC } from './fixtures';
import { BTC_ADDRESS_SENDER } from './fixtures';
import { BTC_ADDRESS_RECEIVER } from './fixtures';

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
  walletAddress: null,
  privKey: null,
};

describe('BitcoinWallet', () => {
  it('can_get_balance', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BTC,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    let w = WalletFactory.getWallet(_config);
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
  });

  it('can_get_fee', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BTC,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.BTC,
      mnemonic,
      0
    );
    let to = BTC_ADDRESS_SENDER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let fees = await w.getTxSendProposals(to, 0.0001);
    expect(typeof fees).toBe('object');
  });

  it('can_not_get_fee_for_large_send', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BTC,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.BTC,
      mnemonic,
      0
    );
    let to = BTC_ADDRESS_RECEIVER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let fees = await w.getTxSendProposals(to, 1);
    expect(fees).toBe(null);
  });

  it('can_send_bitcoin', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BTC,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.BTC,
      mnemonic,
      0
    );
    let to = BTC_ADDRESS_RECEIVER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
    let proposals = await w.getTxSendProposals(to, 0.00002);
    expect(typeof proposals).toBe('object');
    let result = await w.postTxSend(proposals.regular);
    console.log('result', result);
    expect(result.length).toBeGreaterThan(0);
  });
});
