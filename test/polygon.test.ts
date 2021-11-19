import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { MNEMONIC } from './fixtures';
import { ETH_ADDRESS_RECEIVER } from './fixtures';

let config: IWalletConfig = {
  symbol: 'MATIC',
  name: 'Polygon Matic',
  chain: 'POLYGON',
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
    // console.log(address);
    let _config = Object.assign({}, config, { walletAddress: address });
    let w = WalletFactory.getWallet(_config);
    let balance = await w.getBalance();
    expect(balance.getValue()).toBeGreaterThan(0);
    // console.log(balance.getValue())
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

  it('can_send_matic', async () => {
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
    let proposals = await w.getTxSendProposals(to, 0.0001);
    expect(typeof proposals).toBe('object');
    let result = await w.postTxSend(proposals.regular);
    console.log('result', result);
  });
});
