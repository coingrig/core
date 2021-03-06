import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { MNEMONIC } from './fixtures';
// import { ETH_ADDRESS_RECEIVER } from './fixtures';

let config: IWalletConfig = {
  symbol: 'CGT',
  name: 'CGTest',
  chain: 'BSC',
  type: 'token',
  decimals: 18,
  contract: '0x9a7eC0322aD01d7Cb03D410faED912ed92AEa25C',
  walletAddress: null,
  privKey: null,
};

describe('BSC Token Transactions', () => {
  it('can_get_name_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BSC,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    _config.name = null;
    let w = WalletFactory.getWallet(_config);
    let result = await w.getCurrencyName();
    expect(result).toBe(config.name);
  });

  it('can_get_symbol_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BSC,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    _config.symbol = null;
    let w = WalletFactory.getWallet(_config);
    let result = await w.getCurrencySymbol();
    expect(result).toBe(config.symbol);
  });

  it('can_get_decimals_token', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BSC,
      xpub,
      0
    );
    let _config = Object.assign({}, config, { walletAddress: address });
    _config.decimals = null;
    let w = WalletFactory.getWallet(_config);
    let decimals = await w.getDecimals();
    expect(decimals).toBeGreaterThan(0);
  });

  // it('can_get_balance_for_token_without_decimals', async () => {
  //   let mnemonic = MNEMONIC;
  //   let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
  //   let address = await WalletGenerator.generateAddressFromXPub(
  //     Chains.BSC,
  //     xpub,
  //     0
  //   );
  //   let _config = Object.assign({}, config, { walletAddress: address });
  //   _config.decimals = null;
  //   let w = WalletFactory.getWallet(_config);
  //   let decimals = await w.getDecimals();
  //   w.config.decimals = decimals;
  //   let balance = await w.getBalance();
  //   expect(balance.getValue()).toBeGreaterThan(0);
  //   console.log(balance.getValue().toString());
  // });

  // it('can_get_balance_for_token', async () => {
  //   let mnemonic = MNEMONIC;
  //   let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
  //   let address = await WalletGenerator.generateAddressFromXPub(Chains.BSC, xpub, 0);
  //   let _config = Object.assign({}, config, {walletAddress: address});
  //   let w = WalletFactory.getWallet(_config);
  //   let balance = await w.getBalance();
  //   expect(balance.getValue()).toBeGreaterThan(0);
  //   console.log(balance.getValue().toString());
  // });

  // it('can_get_fee_for_token', async () => {
  //   let mnemonic = MNEMONIC;
  //   let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
  //   let address = await WalletGenerator.generateAddressFromXPub(Chains.BSC, xpub, 0);
  //   let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(Chains.BSC, mnemonic, 0);
  //   let to = ETH_ADDRESS_RECEIVER;
  //   let _config = Object.assign({}, config, {walletAddress: address, privKey: privKey});
  //   let w = WalletFactory.getWallet(_config);
  //   let fees = await w.getTxSendProposals(to, 100);
  //   expect(typeof fees).toBe('object');
  //   console.log(fees.regular.settings.fee);
  // });

  // it('can_send_token', async () => {
  //   let mnemonic = MNEMONIC;
  //   let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
  //   let address = await WalletGenerator.generateAddressFromXPub(Chains.BSC, xpub, 0);
  //   let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(Chains.BSC, mnemonic, 0);
  //   let to = ETH_ADDRESS_RECEIVER;
  //   let _config = Object.assign({}, config, {walletAddress: address, privKey: privKey});
  //   let w = WalletFactory.getWallet(_config);
  //   let balance = await w.getBalance();
  //   expect(balance.getValue()).toBeGreaterThan(0);
  //   let proposals = await w.getTxSendProposals(to, 100);
  //   expect(typeof proposals).toBe('object');
  //   let result = await w.postTxSend(proposals.regular);
  //   console.log('result', result);
  // });
});
