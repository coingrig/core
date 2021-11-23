import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { MNEMONIC } from './fixtures';
import { ETH_ADDRESS_RECEIVER } from './fixtures';

let config: IWalletConfig = {
  symbol: 'TST',
  name: 'Polygon Test Token',
  chain: 'POLYGON',
  type: 'token',
  decimals: 18,
  contract: '0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e',
  options: {
    testnet: true,
  },
  walletAddress: null,
  privKey: null,
};

describe('BSC Token Transactions', () => {
  it('can_get_decimals_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(
      Chains.POLYGON,
      mnemonic
    );
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.POLYGON,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    _config.decimals = null;
    let w = WalletFactory.getWallet(_config);
    console.log(w.currency);
    let decimals = await w.getDecimals();
    expect(decimals).toBeGreaterThan(0);
    console.log('decimals', decimals);
  });

  it('can_get_balance_for_token_without_decimals', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(
      Chains.POLYGON,
      mnemonic
    );
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.POLYGON,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    _config.decimals = null;
    let w = WalletFactory.getWallet(_config);
    let decimals = await w.getDecimals();
    w.config.decimals = decimals;
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
    console.log(balance.getValue().toString());
  });

  it('can_get_balance_for_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(
      Chains.POLYGON,
      mnemonic
    );
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.POLYGON,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    let w = WalletFactory.getWallet(_config);
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
    console.log(balance.getValue().toString());
  });

  it('can_get_fee_for_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(
      Chains.POLYGON,
      mnemonic
    );
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.POLYGON,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.POLYGON,
      mnemonic,
      0
    );
    let to = ETH_ADDRESS_RECEIVER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let fees = await w.getTxSendProposals(to, 0.00001);
    expect(typeof fees).toBe('object');
    console.log(fees.regular.settings.fee);
  });

  it('can_send_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(
      Chains.POLYGON,
      mnemonic
    );
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.POLYGON,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.POLYGON,
      mnemonic,
      0
    );
    let to = ETH_ADDRESS_RECEIVER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
    let proposals = await w.getTxSendProposals(to, 0.00001);
    expect(typeof proposals).toBe('object');
    let result = await w.postTxSend(proposals.regular);
    console.log('result', result);
  });
});
