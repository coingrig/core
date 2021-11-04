import { Currency } from '../../currencies';
import { GenericTransactionDriver } from '../GenericTransactionDriver';
import { GenericTxProposal } from '../../fees/GenericTxProposal';
import axios from 'axios';
import { UA } from '../../constants';
import { ECPair, networks, Psbt } from 'bitcoinjs-lib';
import { CONFIG } from '../../utils/config';

export class BTC_Driver extends GenericTransactionDriver {
  currency = Currency.BTC;
  send = async (_transaction: GenericTxProposal) => {
    let txData = await this.prepareSignedTransaction(_transaction.getData());
    return this.sendTx(txData);
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
    const url = this.getTransactionInfoEndpoint() + tx;
    // console.log(url);

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
      return false;
    }
  };

  sendTx = async (txData: any) => {
    const url = this.getTransactionSendEndpoint() + txData;
    // console.log(url);
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
        console.log(error);
      }
      return false;
    }
  };

  getTransactionSendEndpoint() {
    const endpoint = this.config.send_endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(
      this.currency + ' Transaction endpoint is required in config'
    );
  }
  getTransactionInfoEndpoint() {
    const endpoint = this.config.get_endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(
      this.currency + ' Transaction endpoint is required in config'
    );
  }
}
