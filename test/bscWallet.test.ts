import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { ETH_ADDRESS_RECEIVER, MNEMONIC } from './fixtures';

let config: IWalletConfig = {
  symbol: 'BNB',
  name: 'Binance',
  chain: 'BSC',
  type: 'coin',
  decimals: 18,
  contract: null,
  options: {
    testnet: true,
  },
  walletAddress: null,
  privKey: null,
};

describe('BscWallet', () => {
  it('can_get_balance', async () => {
    let mnemonic = 'mouse initial knife crystal rookie link occur consider debris fashion spice cash';
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BSC,
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
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.BSC,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.BSC,
      mnemonic,
      0
    );
    let to = ETH_ADDRESS_RECEIVER;
    let _config = Object.assign({}, config, {
      walletAddress: address,
      privKey: privKey,
    });
    let w = WalletFactory.getWallet(_config);
    let fees = await w.getTxSendProposals(to, 0.0001);
    expect(typeof fees).toBe('object');
  });

  // it('can_send_bnb', async () => {
  //   let mnemonic = MNEMONIC;
  //   let xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
  //   let address = await WalletGenerator.generateAddressFromXPub(
  //     Chains.BSC,
  //     xpub,
  //     0
  //   );
  //   let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
  //     Chains.BSC,
  //     mnemonic,
  //     0
  //   );
  //   let to = ETH_ADDRESS_RECEIVER;
  //   let _config = Object.assign({}, config, {
  //     walletAddress: address,
  //     privKey: privKey,
  //   });
  //   let w = WalletFactory.getWallet(_config);
  //   let balance = await w.getBalance();
  //   expect(balance.getValue()).toBeGreaterThan(0);
  //   let proposals = await w.getTxSendProposals(to, 0.0001);
  //   expect(typeof proposals).toBe('object');
  //   let result = await w.postTxSend(proposals.regular);
  //   console.log('result', result);
  // });
});
