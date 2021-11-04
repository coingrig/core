import { CONFIG, Fees, Transactions, Generators } from "../dist";
import { BTC_ADDRESS_RECEIVER, ETH_ADDRESS_RECEIVER, MNEMONIC } from "./fixtures";

describe('Transactions', () => {
  it('can_use_btc_driver', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await Generators.BitcoinGenerator.generateWalletXpub(mnemonic, CONFIG)
    let from = await Generators.BitcoinGenerator.generateAddressFromXPub(xpub, 0, CONFIG);
    let privKey = await Generators.BitcoinGenerator.generatePrivateKeyFromMnemonic(mnemonic, 0);
    let to = BTC_ADDRESS_RECEIVER;    
    let d = new Fees.BTC_Driver(CONFIG.CHAIN_ENDPOINTS.BTC.fee[0].config);
    let proposals = await d.getTxSendProposals(from, privKey, to, 0.00001);
    expect(typeof proposals).toBe('object');
    let fee = proposals.regular;
    let txHandler = new Transactions.BTC_Driver(CONFIG.CHAIN_ENDPOINTS.BTC.transaction[0].config);
    let signedTx = await txHandler.prepareSignedTransaction(fee.getData())    
    expect(typeof signedTx).toBe('string');
    expect(signedTx.length).toBeGreaterThan(0);
    let sent = await txHandler.send(fee);
    expect(sent.length).toBeGreaterThan(0);
    // console.log(sent);
  });

  it('can_use_eth_driver', async () => {
    let mnemonic = MNEMONIC;
    let xpub = await Generators.EthereumGenerator.generateWalletXpub(mnemonic, CONFIG)
    let from = await Generators.EthereumGenerator.generateAddressFromXPub(xpub, 0, CONFIG);
    let privKey = await Generators.EthereumGenerator.generatePrivateKeyFromMnemonic(mnemonic, 0);
    let to = ETH_ADDRESS_RECEIVER;
    let d = new Fees.ETH_Driver(CONFIG.CHAIN_ENDPOINTS.ETH.fee[0].config);
    let proposals = await d.getTxSendProposals(from, privKey, to, 0.00001);
    expect(typeof proposals).toBe('object');
    let fee = proposals.regular;
    let txHandler = new Transactions.ETH_Driver(CONFIG.CHAIN_ENDPOINTS.ETH.transaction[0].config);
    let signedTx = await txHandler.prepareSignedTransaction(fee.getData())    
    expect(typeof signedTx).toBe('string');
    expect(signedTx.length).toBeGreaterThan(0);
    let sent = await txHandler.send(fee);
    expect(sent.length).toBeGreaterThan(0);
    // console.log(sent);
  });
});