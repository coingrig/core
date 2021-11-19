import { CONFIG, Fees, Transactions, Generators, IWalletConfig } from '../dist';
import {
  BTC_ADDRESS_RECEIVER,
  ETH_ADDRESS_RECEIVER,
  MNEMONIC,
} from './fixtures';

const BTC_DESCRIPTOR: IWalletConfig = {
  symbol: 'BTC',
  name: 'Bitcoin',
  chain: 'BTC',
  type: 'coin',
  decimals: 8,
  contract: null,
  walletAddress: null,
  privKey: null,
};

const ETH_DESCRIPTOR: IWalletConfig = {
  symbol: 'ETH',
  name: 'Ethereum',
  chain: 'BTC',
  type: 'ETH',
  decimals: 18,
  contract: null,
  walletAddress: null,
  privKey: null,
};

const BSC_DESCRIPTOR: IWalletConfig = {
  symbol: 'BNB',
  name: 'BNB',
  chain: 'BSC',
  type: 'coin',
  decimals: 18,
  contract: null,
  walletAddress: null,
  privKey: null,
};

describe('Transactions', () => {
  it('can_use_btc_driver', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await Generators.BitcoinGenerator.generateWalletXpub(
      mnemonic,
      CONFIG
    );
    let from = await Generators.BitcoinGenerator.generateAddressFromXPub(
      xpub,
      0,
      CONFIG
    );
    let privKey = await Generators.BitcoinGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );
    let config = Object.assign({}, BTC_DESCRIPTOR, {
      privKey: privKey,
      walletAddress: from,
    });
    let to = BTC_ADDRESS_RECEIVER;
    let d = new Fees.BTC_Driver(
      config,
      CONFIG.CHAIN_ENDPOINTS.BTC.fee[0].config
    );
    let proposals = await d.getTxSendProposals(to, 0.00001);
    expect(typeof proposals).toBe('object');
    let fee = proposals.regular;
    let txHandler = new Transactions.BTC_Driver(
      CONFIG.CHAIN_ENDPOINTS.BTC.transaction[0].config
    );
    let signedTx = await txHandler.prepareSignedTransaction(fee.getData());
    expect(typeof signedTx).toBe('string');
    expect(signedTx.length).toBeGreaterThan(0);
    let sent = await txHandler.send(fee);
    expect(sent.length).toBeGreaterThan(0);
    // console.log(sent);
  });

  it('can_use_eth_driver', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await Generators.EthereumGenerator.generateWalletXpub(
      mnemonic,
      CONFIG
    );
    let from = await Generators.EthereumGenerator.generateAddressFromXPub(
      xpub,
      0,
      CONFIG
    );
    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );
    let to = ETH_ADDRESS_RECEIVER;
    let config = Object.assign({}, ETH_DESCRIPTOR, {
      privKey: privKey,
      walletAddress: from,
    });
    let d = new Fees.ETH_Driver(
      config,
      CONFIG.CHAIN_ENDPOINTS.ETH.fee[0].config
    );
    let proposals = await d.getTxSendProposals(to, 0.00001);
    expect(typeof proposals).toBe('object');
    let fee = proposals.regular;
    let txHandler = new Transactions.ETH_Driver(
      CONFIG.CHAIN_ENDPOINTS.ETH.transaction[0].config
    );
    let signedTx = await txHandler.prepareSignedTransaction(fee.getData());
    expect(typeof signedTx).toBe('string');
    expect(signedTx.length).toBeGreaterThan(0);
    let sent = await txHandler.send(fee);
    expect(sent.length).toBeGreaterThan(0);
    // console.log(sent);
  });

  it('can_use_bsc_driver', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await Generators.EthereumGenerator.generateWalletXpub(
      mnemonic,
      CONFIG
    );
    let from = await Generators.EthereumGenerator.generateAddressFromXPub(
      xpub,
      0,
      CONFIG
    );
    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );
    let to = ETH_ADDRESS_RECEIVER;
    let config = Object.assign({}, BSC_DESCRIPTOR, {
      privKey: privKey,
      walletAddress: from,
    });
    let d = new Fees.BSC_Driver(
      config,
      CONFIG.CHAIN_ENDPOINTS.BSC.fee[0].config
    );
    let proposals = await d.getTxSendProposals(to, 0.00001);
    expect(typeof proposals).toBe('object');
    let fee = proposals.regular;
    let txHandler = new Transactions.BSC_Driver(
      CONFIG.CHAIN_ENDPOINTS.BSC.transaction[0].config
    );
    let signedTx = await txHandler.prepareSignedTransaction(fee.getData());
    expect(typeof signedTx).toBe('string');
    expect(signedTx.length).toBeGreaterThan(0);
    let sent = await txHandler.send(fee);
    expect(sent.length).toBeGreaterThan(0);
    // console.log(sent);
  });
});
