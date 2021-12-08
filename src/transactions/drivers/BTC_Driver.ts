import { GenericTransactionDriver } from '../GenericTransactionDriver';
import { GenericTxProposal } from '../../fees/GenericTxProposal';
import axios from 'axios';
import { GENERIC_REQUEST_THROTTLE_DELAY, UA } from '../../constants';
import { ECPair, networks, Psbt } from 'bitcoinjs-lib';
import { CONFIG } from '../../utils/config';

export class BTC_Driver extends GenericTransactionDriver {
  send = async (transaction: GenericTxProposal) => {
    let txData = await this.prepareSignedTransaction(transaction.getData());
    return await this.sendRaw(txData);
  };

  prepareSignedTransaction = async (body: any) => {
    const { fromUTXO, to } = body;
    const net = CONFIG.TESTNET ? networks.testnet : networks.bitcoin;
    const psbt = new Psbt({ network: net });
    const privateKeysToSign = [];
    for (const item of fromUTXO) {
      const t = await this.getTxs(item.txHash);
      // const txHex = t.hex;
      psbt.addInput({
        // @ts-ignore
        hash: item.txHash,
        index: item.index,
        // nonWitnessUtxo: Buffer.from(txHex, 'hex'),
        witnessUtxo: {
          script: Buffer.from(t.vout?.[item.index].hex, 'hex'),
          value: item.value,
        },
      });
      privateKeysToSign.push(item.signatureId || item.privateKey);
    }
    for (const item of to) {
      psbt.addOutput({
        address: item.address,
        value: item.value,
      });
    }

    if (fromUTXO && fromUTXO[0].signatureId) {
      return JSON.stringify({
        txData: JSON.stringify(psbt),
        privateKeysToSign,
      });
    }
    for (let index = 0; index < privateKeysToSign.length; index++) {
      const item = privateKeysToSign[index];
      const kp = ECPair.fromWIF(item, net);
      psbt.signInput(index, kp);
    }
    let x = psbt.finalizeAllInputs().extractTransaction();
    return x.toHex();
  };

  getTxs = async (tx: string) => {
    let endpoints = this.getTransactionInfoEndpoint();
    for (let i = 0; i < endpoints.length; i++) {
      let endpoint = endpoints[i];
      const url = endpoint + tx;
      const params: object = {
        method: 'get',
        url: url,
        headers: {
          'User-Agent': UA,
        },
      };
      try {
        const response = await axios(params);
        return response.data;
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        }
      }
      await new Promise(resolve =>
        setTimeout(resolve, GENERIC_REQUEST_THROTTLE_DELAY)
      );
    }
    return false;
  };

  sendRaw = async (transaction: any): Promise<any> => {
    let endpoints = this.getTransactionSendEndpoint();
    for (let i = 0; i < endpoints.length; i++) {
      let endpoint = endpoints[i];
      const url = endpoint + transaction;
      const params: object = {
        method: 'get',
        url: url,
        headers: {
          'User-Agent': UA,
        },
      };
      try {
        const response = await axios(params);
        return response.data.result;
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('response.data', error);
        }
      }
      await new Promise(resolve =>
        setTimeout(resolve, GENERIC_REQUEST_THROTTLE_DELAY)
      );
    }
    return false;
  };

  getTransactionSendEndpoint() {
    let endpoints = [];
    if (this.config.send_endpoint) {
      if (!Array.isArray(this.config.send_endpoint)) {
        endpoints = [this.config.send_endpoint];
      } else {
        endpoints = this.config.send_endpoint;
      }
      return endpoints;
    }
    throw new Error(
      this.currency + ' Transaction endpoint is required in config'
    );
  }
  getTransactionInfoEndpoint() {
    let endpoints = [];
    if (this.config.send_endpoint) {
      if (!Array.isArray(this.config.get_endpoint)) {
        endpoints = [this.config.get_endpoint];
      } else {
        endpoints = this.config.get_endpoint;
      }
      return endpoints;
    }
    throw new Error(
      this.currency + ' Transaction endpoint is required in config'
    );
  }
}
