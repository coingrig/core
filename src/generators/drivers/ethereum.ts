import { hdkey as ethHdKey } from 'ethereumjs-wallet';
import { mnemonicToSeed } from 'bip39';

import { ETH_DERIVATION_PATH, TESTNET_DERIVATION_PATH } from '../../constants';
import { CONFIG } from '../../utils/config';
import { GenericGenerator } from '../GenericGenerator';
/**
 *
 *
 * @export
 * @class EthereumGenerator
 * @extends {GenericGenerator}
 */
export class EthereumGenerator extends GenericGenerator {
  static async generateWalletXpub(mnemonic: any, config: any = CONFIG) {
    const path = config.TESTNET ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path);
    return derivePath.publicExtendedKey().toString();
  }
  static async generatePrivateKeyFromMnemonic(
    mnemonic: any,
    derivation: any,
    config: any = CONFIG
  ) {
    const path = config.TESTNET ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
    const derivePath = hdwallet.derivePath(path).deriveChild(derivation);
    return derivePath.getWallet().getPrivateKeyString();
  }
  static async generateAddressFromXPub(
    xpub: any,
    derivation: any,
    _config: any
  ) {
    const w = ethHdKey.fromExtendedKey(xpub);
    const wallet = w.deriveChild(derivation).getWallet();
    return (
      '0x' +
      wallet
        .getAddress()
        .toString('hex')
        .toLowerCase()
    );
  }
}
