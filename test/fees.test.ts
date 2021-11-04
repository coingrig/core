import { Fees } from '../dist';
import { CONFIG } from '../dist';
import { BitcoinFee, EthereumFee } from '../dist/fees';
import { Generators } from '../dist';
import { BTC_ADDRESS_RECEIVER, BTC_ADDRESS_SENDER, ETH_ADDRESS_RECEIVER, ETH_ADDRESS_SENDER, MNEMONIC } from './fixtures';

describe('Fees', () => {
  it('can_use_btc_driver', async () => {
    let mnemonic = MNEMONIC;

    let privKey = await Generators.BitcoinGenerator.generatePrivateKeyFromMnemonic(mnemonic, 0);

    let from = BTC_ADDRESS_SENDER;
    let to = BTC_ADDRESS_RECEIVER;
    let d = new Fees.BTC_Driver(CONFIG.CHAIN_ENDPOINTS.BTC.fee[0].config);
    let proposals = await d.getTxSendProposals(from, privKey, to, 0.00001);
    expect(typeof proposals).toBe('object');
    ['regular', 'priority'].forEach(element => {
      expect(proposals).toHaveProperty(element);
      let fee = <BitcoinFee> proposals[element];
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

    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(mnemonic, 0);

    let d = new Fees.ETH_Driver(CONFIG.CHAIN_ENDPOINTS.ETH.fee[0].config);
    let proposals = await d.getTxSendProposals(from, privKey, to, 0.00001);
    expect(typeof proposals).toBe('object');
    ['regular', 'priority'].forEach(element => {
      expect(proposals).toHaveProperty(element);
      let fee = <EthereumFee> proposals[element];
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

});
