## 🅒🅖🅒 Coingrig Core
The Coingrig Core library handling the wallet interactions

### Setup
Run `yarn`. (Installs dependencies and links packages in the workspace.)

### Compilation
Create an `.env` file to configure the platform: `TESTNET=true|false`.  
The default value is `TESTNET=false`.

### Test
Jest tests are set up to run with `TESTNET=true yarn test`.  

---

## Documentation
## Classes

<dl>
<dt><a href="#BitcoinGenerator">BitcoinGenerator</a> ⇐ <code><a href="#GenericGenerator">GenericGenerator</a></code></dt>
<dd></dd>
<dt><a href="#BscGenerator">BscGenerator</a> ⇐ <code><a href="#EthereumGenerator">EthereumGenerator</a></code></dt>
<dd></dd>
<dt><a href="#EthereumGenerator">EthereumGenerator</a> ⇐ <code><a href="#GenericGenerator">GenericGenerator</a></code></dt>
<dd></dd>
<dt><a href="#PolygonGenerator">PolygonGenerator</a> ⇐ <code><a href="#EthereumGenerator">EthereumGenerator</a></code></dt>
<dd></dd>
<dt><a href="#GenericGenerator">GenericGenerator</a></dt>
<dd></dd>
<dt><a href="#WalletFactory">WalletFactory</a></dt>
<dd></dd>
<dt><a href="#WalletGenerator">WalletGenerator</a></dt>
<dd></dd>
<dt><a href="#GenericWallet">GenericWallet</a></dt>
<dd><p>Don't use the generic wallet, for a new coin write an implementation</p></dd>
</dl>

<a name="BitcoinGenerator"></a>

## BitcoinGenerator ⇐ [<code>GenericGenerator</code>](#GenericGenerator)
**Kind**: global class  
**Extends**: [<code>GenericGenerator</code>](#GenericGenerator)  
<a name="BscGenerator"></a>

## BscGenerator ⇐ [<code>EthereumGenerator</code>](#EthereumGenerator)
**Kind**: global class  
**Extends**: [<code>EthereumGenerator</code>](#EthereumGenerator)  
<a name="EthereumGenerator"></a>

## EthereumGenerator ⇐ [<code>GenericGenerator</code>](#GenericGenerator)
**Kind**: global class  
**Extends**: [<code>GenericGenerator</code>](#GenericGenerator)  
<a name="PolygonGenerator"></a>

## PolygonGenerator ⇐ [<code>EthereumGenerator</code>](#EthereumGenerator)
**Kind**: global class  
**Extends**: [<code>EthereumGenerator</code>](#EthereumGenerator)  
<a name="GenericGenerator"></a>

## GenericGenerator
**Kind**: global class  

* [GenericGenerator](#GenericGenerator)
    * [.generateWalletXpub(mnemonic, config)](#GenericGenerator.generateWalletXpub) ⇒ <code>string</code>
    * [.generatePrivateKeyFromMnemonic(mnemonic, derivation, config)](#GenericGenerator.generatePrivateKeyFromMnemonic) ⇒ <code>string</code>
    * [.generateAddressFromXPub(xpub, derivation, config)](#GenericGenerator.generateAddressFromXPub) ⇒ <code>string</code>

<a name="GenericGenerator.generateWalletXpub"></a>

### GenericGenerator.generateWalletXpub(mnemonic, config) ⇒ <code>string</code>
<p>Generate the wallet's XPUB</p>

**Kind**: static method of [<code>GenericGenerator</code>](#GenericGenerator)  
**Returns**: <code>string</code> - <p>The XPUB value</p>  

| Param | Type |
| --- | --- |
| mnemonic | <code>string</code> | 
| config | <code>\*</code> | 

<a name="GenericGenerator.generatePrivateKeyFromMnemonic"></a>

### GenericGenerator.generatePrivateKeyFromMnemonic(mnemonic, derivation, config) ⇒ <code>string</code>
<p>Generate the wallet's Private Key</p>

**Kind**: static method of [<code>GenericGenerator</code>](#GenericGenerator)  
**Returns**: <code>string</code> - <p>The Private Key</p>  

| Param | Type |
| --- | --- |
| mnemonic | <code>string</code> | 
| derivation | <code>integer</code> | 
| config | <code>\*</code> | 

<a name="GenericGenerator.generateAddressFromXPub"></a>

### GenericGenerator.generateAddressFromXPub(xpub, derivation, config) ⇒ <code>string</code>
<p>Generate teh wallet's Public Address</p>

**Kind**: static method of [<code>GenericGenerator</code>](#GenericGenerator)  
**Returns**: <code>string</code> - <p>The Public Key</p>  

| Param | Type |
| --- | --- |
| xpub | <code>string</code> | 
| derivation | <code>integer</code> | 
| config | <code>\*</code> | 

<a name="WalletFactory"></a>

## WalletFactory
**Kind**: global class  
<a name="new_WalletFactory_new"></a>

### new WalletFactory()
<p>Implements the Factory pattern to help generate easily wallets
for the supported blockchains.</p>

<a name="WalletGenerator"></a>

## WalletGenerator
**Kind**: global class  

* [WalletGenerator](#WalletGenerator)
    * [.generateMnemonic([size])](#WalletGenerator.generateMnemonic) ⇒ <code>string</code>
    * [.getDriver(chain)](#WalletGenerator.getDriver) ⇒ [<code>GenericGenerator</code>](#GenericGenerator)
    * [.generateWalletXpub(chain, mnemonic, [config])](#WalletGenerator.generateWalletXpub) ⇒ <code>string</code>
    * [.generatePrivateKeyFromMnemonic(chain, mnemonic, derivation, [config])](#WalletGenerator.generatePrivateKeyFromMnemonic) ⇒ <code>string</code>
    * [.generateAddressFromXPub(chain, xpub, derivation, [config])](#WalletGenerator.generateAddressFromXPub) ⇒ <code>string</code>

<a name="WalletGenerator.generateMnemonic"></a>

### WalletGenerator.generateMnemonic([size]) ⇒ <code>string</code>
<p>Generates a string containing the 12 words used as a mnemonic
to create the private and public wallet keys.</p>

**Kind**: static method of [<code>WalletGenerator</code>](#WalletGenerator)  
**Returns**: <code>string</code> - <p>The mnemonic</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>128</code> | <p>Or use 256 for 24 words</p> |

<a name="WalletGenerator.getDriver"></a>

### WalletGenerator.getDriver(chain) ⇒ [<code>GenericGenerator</code>](#GenericGenerator)
<p>Offers direct access to the drivers that offer the key generation.</p>

**Kind**: static method of [<code>WalletGenerator</code>](#WalletGenerator)  

| Param | Type |
| --- | --- |
| chain | [<code>Chains</code>](#Chains) | 

<a name="WalletGenerator.generateWalletXpub"></a>

### WalletGenerator.generateWalletXpub(chain, mnemonic, [config]) ⇒ <code>string</code>
<p>Generate the wallet's XPUB address.
The source of all addresses to be generated for the public.</p>

**Kind**: static method of [<code>WalletGenerator</code>](#WalletGenerator)  
**Returns**: <code>string</code> - <p>The wallet's XPUB address</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| chain | [<code>Chains</code>](#Chains) |  | <p>The type of chain</p> |
| mnemonic | <code>string</code> |  |  |
| [config] | <code>\*</code> | <code>CONFIG</code> |  |

<a name="WalletGenerator.generatePrivateKeyFromMnemonic"></a>

### WalletGenerator.generatePrivateKeyFromMnemonic(chain, mnemonic, derivation, [config]) ⇒ <code>string</code>
<p>Generate the wallet's private key.</p>

**Kind**: static method of [<code>WalletGenerator</code>](#WalletGenerator)  
**Returns**: <code>string</code> - <p>The wallet's private key</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| chain | [<code>Chains</code>](#Chains) |  | <p>The type of chain</p> |
| mnemonic | <code>string</code> |  |  |
| derivation | <code>integer</code> |  | <p>The derivation key to allow generation of more private keys for the same chain</p> |
| [config] | <code>\*</code> | <code>CONFIG</code> |  |

<a name="WalletGenerator.generateAddressFromXPub"></a>

### WalletGenerator.generateAddressFromXPub(chain, xpub, derivation, [config]) ⇒ <code>string</code>
<p>Generate the public wallet address for the specified chain</p>

**Kind**: static method of [<code>WalletGenerator</code>](#WalletGenerator)  
**Returns**: <code>string</code> - <p>The wallet's public address</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| chain | [<code>Chains</code>](#Chains) |  | <p>The type of chain</p> |
| xpub | <code>string</code> |  |  |
| derivation | <code>integer</code> |  |  |
| [config] | <code>\*</code> | <code>CONFIG</code> |  |

<a name="GenericWallet"></a>

## GenericWallet
<p>Don't use the generic wallet, for a new coin write an implementation</p>

**Kind**: global class  
<a name="Chains"></a>

## Chains : <code>enum</code>
<p>Enum for supported blockchains types</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BTC | <code>string</code> | <p>&quot;BTC&quot;</p> |
| ETH | <code>string</code> | <p>&quot;ETH&quot;</p> |
| MATIC | <code>string</code> | <p>&quot;MATIC&quot;</p> |
| BSC | <code>string</code> | <p>&quot;BSC&quot;</p> |


* * *

## Code of Conduct

This library has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## License

The Coingrig Core Library is licensed under the [MIT License](LICENSE).
