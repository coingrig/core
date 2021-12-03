import Web3 from 'web3';

export class Web3SigningManager {
  client: Web3;

  constructor(client: any, privateKey: any) {
    this.client = client;
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

  async sign(dataToSign: any, address: string | null = null) {
    if (!address) {
      address = this.client.eth.defaultAccount!;
    }
    return await this.client.eth.sign(dataToSign, address);
  }

  async signTypedData(dataToSign: any, address: string | null = null) {
    if (!address) {
      address = this.client.eth.defaultAccount!;
    }
    return await this.client.eth.sign(dataToSign, address);
  }

  async signTransaction(transactionObject: any, address: string | null = null) {
    if (!address) {
      address = this.client.eth.defaultAccount!;
    }
    return await this.client.eth.signTransaction(transactionObject, address);
  }
}
