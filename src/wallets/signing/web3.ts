import Web3 from 'web3';
import { signTypedData } from '@metamask/eth-sig-util';
import { toBuffer } from 'ethereumjs-util';
export class Web3SigningManager {
  client: Web3;
  privateKey: string;

  constructor(client: any, privateKey: any) {
    this.client = client;
    this.privateKey = privateKey;
    this.client.eth.accounts.wallet.add(privateKey);
    this.client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
  }

  async personalSign(
    dataToSign: any,
    password: string,
    address: string | null = null
  ) {
    if (!address) {
      address = this.client.eth.defaultAccount!;
    }
    return await this.client.eth.personal.sign(dataToSign, address, password);
  }

  async sign(dataToSign: any) {
    return this.client.eth.accounts.sign(dataToSign, this.privateKey).signature;
  }

  async signTypedData(dataToSign: any) {
    // console.log('private key', this.privateKey);
    let privateKeyBuffer = toBuffer(this.privateKey);
    // console.log('privateKeyBuffer', privateKeyBuffer);
    // console.log('dataToSign', dataToSign);
    let sig = signTypedData(privateKeyBuffer, dataToSign);
    // console.log('sig', sig);
    return sig;
    // return (this.client.eth.accounts.sign(dataToSign, this.privateKey)).signature;
  }

  async signTransaction(transactionObject: any) {
    return (
      await this.client.eth.accounts.signTransaction(
        transactionObject,
        this.privateKey
      )
    ).rawTransaction as string;
  }
}
