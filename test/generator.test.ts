import { WalletGenerator, Chains} from '../dist'
import { MNEMONIC } from './fixtures';

let mnemonic = MNEMONIC;

describe('WalletGenerator', () => {
  it('can_generate_mnemonic', async () => {
    let mnemonic = await WalletGenerator.generateMnemonic();
    expect(typeof mnemonic).toBe('string');
  });

  it('can_generate_btc_wallet', async () => {
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    expect(typeof xpub).toBe('string');
    expect(xpub.length).not.toEqual(0)
  });

  it('can_generate_pvk', async () => {
    let pvk = await WalletGenerator.generatePrivateKeyFromMnemonic(Chains.BTC, mnemonic, 0);
    expect(typeof pvk).toBe('string');
    expect(pvk.length).not.toEqual(0)
  });

  it('can_generate_address_from_xpub', async () => {
    let xpub = await WalletGenerator.generateWalletXpub(Chains.BTC, mnemonic);
    expect(typeof xpub).toBe('string');
    expect(xpub.length).not.toEqual(0)
    let address = await WalletGenerator.generateAddressFromXPub(Chains.BTC, xpub, 0);
    expect(typeof address).toBe('string');
    expect(address.length).not.toEqual(0)

    xpub = await WalletGenerator.generateWalletXpub(Chains.ETH, mnemonic);
    expect(typeof xpub).toBe('string');
    expect(xpub.length).not.toEqual(0)
    address = await WalletGenerator.generateAddressFromXPub(Chains.ETH, xpub, 0);
    expect(typeof address).toBe('string');
    expect(address.length).not.toEqual(0)

    xpub = await WalletGenerator.generateWalletXpub(Chains.BSC, mnemonic);
    expect(typeof xpub).toBe('string');
    expect(xpub.length).not.toEqual(0)
    address = await WalletGenerator.generateAddressFromXPub(Chains.BSC, xpub, 0);
    expect(typeof address).toBe('string');
    expect(address.length).not.toEqual(0)

    xpub = await WalletGenerator.generateWalletXpub(Chains.MATIC, mnemonic);
    expect(typeof xpub).toBe('string');
    expect(xpub.length).not.toEqual(0)
    address = await WalletGenerator.generateAddressFromXPub(Chains.MATIC, xpub, 0);
    expect(typeof address).toBe('string')
    expect(address.length).not.toEqual(0)
  });
});