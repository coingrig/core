import { Fees, IWalletConfig } from '../dist';
import { CONFIG } from '../dist';
import { BitcoinFee, BnbFee, EthereumFee } from '../dist/fees';
import { Generators } from '../dist';
import {
  BTC_ADDRESS_RECEIVER,
  BTC_ADDRESS_SENDER,
  ETH_ADDRESS_RECEIVER,
  ETH_ADDRESS_SENDER,
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

describe('Fees', () => {
  it('can_use_btc_driver', async () => {
    let mnemonic = MNEMONIC;

    let privKey = await Generators.BitcoinGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );

    let from = BTC_ADDRESS_SENDER;
    let to = BTC_ADDRESS_RECEIVER;
    let config = Object.assign({}, BTC_DESCRIPTOR, {
      privKey: privKey,
      walletAddress: from,
    });
    let d = new Fees.BTC_Driver(
      config,
      CONFIG.CHAIN_ENDPOINTS.BTC.fee[0].config
    );
    let proposals = await d.getTxSendProposals(to, 0.00001);
    expect(typeof proposals).toBe('object');
    ['regular', 'priority'].forEach(element => {
      expect(proposals).toHaveProperty(element);
      let fee: BitcoinFee = proposals[element];
      expect(fee).toHaveProperty('currency');
      expect(fee.currency).toBe('BTC');
      expect(fee).toHaveProperty('settings');
      expect(fee.settings).toEqual({
        value: expect.anything(),
        proposal: expect.anything(),
      });
      expect(fee.getData()).toEqual({
        fromUTXO: expect.anything(),
        to: expect.anything(),
      });
      expect(fee.getFeeValue()).toBeGreaterThan(0);
    });
  });

  it('can_use_eth_driver', async () => {
    let mnemonic = MNEMONIC;
    let from = ETH_ADDRESS_SENDER;
    let to = ETH_ADDRESS_RECEIVER;

    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );
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
    ['regular', 'priority'].forEach(element => {
      expect(proposals).toHaveProperty(element);
      let fee: EthereumFee = proposals[element];
      expect(fee).toHaveProperty('currency');
      expect(fee.currency).toBe('ETH');
      expect(fee).toHaveProperty('settings');
      expect(fee.settings).toEqual({
        fee: expect.anything(),
        proposal: expect.anything(),
        fromPrivateKey: expect.anything(),
      });
      let proposal = fee.getData().proposal;
      expect(typeof proposal).toEqual('object');
      expect(fee.getFeeValue()).toBeGreaterThan(0);
    });
  });

  it('can_use_bsc_driver', async () => {
    let mnemonic = MNEMONIC;
    let from = ETH_ADDRESS_SENDER;
    let to = ETH_ADDRESS_RECEIVER;

    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(
      mnemonic,
      0
    );
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
    ['regular', 'priority'].forEach(element => {
      expect(proposals).toHaveProperty(element);
      let fee: BnbFee = proposals[element];
      expect(fee).toHaveProperty('currency');
      expect(fee.currency).toBe('BNB');
      expect(fee).toHaveProperty('settings');
      expect(fee.settings).toEqual({
        fee: expect.anything(),
        proposal: expect.anything(),
        fromPrivateKey: expect.anything(),
      });
      let proposal = fee.getData().proposal;
      console.log(fee.settings);
      console.log(proposal);
      expect(typeof proposal).toEqual('object');
      expect(fee.getFeeValue()).toBeGreaterThan(0);
    });
  });
});
