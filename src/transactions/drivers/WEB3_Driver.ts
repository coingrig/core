import Web3 from 'web3';
import { GenericTxProposal } from '../../fees/GenericTxProposal';
import { GenericTransactionDriver } from '../GenericTransactionDriver';

export class WEB3_Driver extends GenericTransactionDriver {
  send = async (transaction: GenericTxProposal): Promise<any> => {
    const data: any = transaction.getData();
    let txRaw = await this.prepareSignedTransaction(data);
    return this.sendRaw(txRaw);    
  };

  sendRaw = async (transaction: any): Promise<any> => {
    const provider = new Web3.providers.HttpProvider(this.getEndpoint());

    const data: any = transaction.getData();

    const fromPrivateKey = data.fromPrivateKey;
    const client = new Web3(provider);
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let p = new Promise((resolve, reject) => {
      client.eth
        .sendSignedTransaction(transaction)
        .on('transactionHash', function(hash) {
          resolve(hash);
        })
        .on('receipt', function(_receipt) {
          // resolve(receipt.transactionHash);
        })
        // Fired for every confirmation up to the 12th confirmation.
        // .on('confirmation', function(_confirmationNumber, _receipt){
        //   console.log('_confirmationNumber', _confirmationNumber)
        //   resolve(_receipt);
        // })
        .on('error', function(error) {
          reject(error);
        });
    });
    return p;
  }

  prepareSignedTransaction = async (data: any) => {
    const provider = new Web3.providers.HttpProvider(this.getEndpoint());
    const fromPrivateKey = data.fromPrivateKey;
    const client = new Web3(provider);
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let txRaw;

    if (data.signatureId) {
      txRaw = data.proposal;
    } else {
      txRaw = (
        await client.eth.accounts.signTransaction(
          data.proposal,
          fromPrivateKey as string
        )
      ).rawTransaction as string;
    }

    return txRaw;
  };

  getEndpoint() {
    const endpoint = this.config.endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(
      this.currency + ' Transaction endpoint is required in config'
    );
  }
}
