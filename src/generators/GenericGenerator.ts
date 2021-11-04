/**
 *
 *
 * @export
 * @class GenericGenerator
 */
export class GenericGenerator {
  /**
   * Generate the wallet's XPUB
   *
   * @static
   * @param {string} mnemonic
   * @param {*} config
   * @memberof GenericGenerator
   * @returns {string} The XPUB value
   */
  static generateWalletXpub(_mnemonic: any, _config: any) { };
  /**
   * Generate the wallet's Private Key
   *
   * @static
   * @param {string} mnemonic
   * @param {integer} derivation
   * @param {*} config
   * @memberof GenericGenerator
   * @returns {string} The Private Key
   */
  static generatePrivateKeyFromMnemonic(_mnemonic: any, _derivation: any, _config: any) { };
  /**
   * Generate teh wallet's Public Address
   *
   * @static
   * @param {string} xpub
   * @param {integer} derivation
   * @param {*} config
   * @memberof GenericGenerator
   * @returns {string} The Public Key
   */
  static generateAddressFromXPub(_xpub: any, _derivation: any, _config: any) { };

}
