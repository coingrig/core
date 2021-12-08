import { IWalletConfig, WalletFactory } from '../dist';
import { WalletGenerator } from '../dist';
import { Chains } from '../dist';
import { ETH_ADDRESS_RECEIVER, MNEMONIC } from './fixtures';

let config: IWalletConfig = {
  symbol: 'ETH',
  name: 'Ethereum',
  chain: 'ETH',
  type: 'coin',
  decimals: 18,
  contract: null,
  options: {
    testnet: true,
  },
  walletAddress: null,
  privKey: null,
};

describe('EthereumWallet', () => {
  it('can_get_balance', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.ETH, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.ETH,
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
    let xpub = await WalletGenerator.generateWalletXpub(Chains.ETH, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.ETH,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.ETH,
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

  it('can_send_ethereum', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await WalletGenerator.generateWalletXpub(Chains.ETH, mnemonic);
    let address = await WalletGenerator.generateAddressFromXPub(
      Chains.ETH,
      xpub,
      0
    );
    let privKey = await WalletGenerator.generatePrivateKeyFromMnemonic(
      Chains.ETH,
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
