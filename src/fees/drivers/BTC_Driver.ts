import { IFeeMap, FEE_TYPES } from '../IFee';
import { GenericDriver } from '../GenericDriver';
import { BitcoinFee } from '../types/BitcoinFee';
import axios from 'axios';

import { GENERIC_REQUEST_THROTTLE_DELAY, UA } from '../../constants';
import { btc_to_satoshi, satoshi_to_btc } from '../../currencyFunctions';

let coinSelect = require('coinselect');

export class BTC_Driver extends GenericDriver {
  getUTXOEndpoint() {
    let endpoints = [];
    if (this.config.utxo_endpoint) {
      if (!Array.isArray(this.config.utxo_endpoint)) {
        endpoints = [this.config.utxo_endpoint];
      } else {
        endpoints = this.config.utxo_endpoint;
      }
      return endpoints;
    }
    throw new Error('BTC UTXO endpoint is required in config section');
  }
  getUTXO = async (address: string) => {
    let endpoints = this.getUTXOEndpoint();
    for (let i = 0; i < endpoints.length; i++) {
      let endpoint = endpoints[i];
      const url = endpoint + address + '?confirmed=false';
      const param: object = {
        method: 'get',
        url: url,
        headers: {
          'User-Agent': UA,
        },
      };
      try {
        const response = await axios(param);
        return response.data;
      } catch (e) {}
      await new Promise(resolve =>
        setTimeout(resolve, GENERIC_REQUEST_THROTTLE_DELAY)
      );
    }
    throw new Error('Unable to retrieve UTXO information!');
  };
  getTxSendProposals = async (destination: string, valueToSend: number) => {
    const fromAddress = this.assetConfig.walletAddress!;
    const privKey = this.assetConfig.privKey;
    //  const currency = this.assetConfig.symbol;

    const config: object = {
      method: 'get',
      url: this.getFeeEndpoint(),
    };
    const response = await axios(config);
    const data = response.data;
    // {
    // "limits": {
    //   "min": 2,
    //   "max": 16
    // },
    // "regular": 4,
    // "priority": 11
    // }
    // TODO: Check valid reply

    let utxosQueryResults = await this.getUTXO(fromAddress);
    let utxos: any[] = [];

    utxosQueryResults.forEach((t: any) => {
      utxos.push({
        txid: t.txid,
        vout: t.vout,
        value: parseInt(t.value, 10),
        amount: satoshi_to_btc(t.value),
      });
    });
    let targets = [
      {
        address: destination,
        value: btc_to_satoshi(valueToSend),
      },
    ];
    let fees: IFeeMap = {};
    //
    let feeSet = [FEE_TYPES.REGULAR, FEE_TYPES.PRIORITY];
    let inputs: any = [];
    let outputs: any = [];
    let fee = 0;
    let result: any = {};
    let adjustedOutputs: any = [];
    let adjustedInputs: any = [];

    let privateKey = privKey;

    for (let i = 0; i < feeSet.length; i++) {
      const feeType = feeSet[i];
      result = coinSelect(utxos.slice(), targets.slice(), data[feeType]);
      inputs = result.inputs;
      outputs = result.outputs;
      if (!inputs || !outputs) {
        throw new Error('Can not compute fees for the passed value');
      }
      fee = result.fee;
      adjustedOutputs = [];
      adjustedInputs = [];
      for (let z = 0; z < inputs.length; z++) {
        const o = inputs[z];
        adjustedInputs.push({
          txHash: o.txid,
          index: o.vout,
          privateKey: privateKey,
          value: o.value, //SATOSHI
          amount: o.amount, //BTC
        });
      }
      // Convert from satoshi back to BTC [];
      for (let z = 0; z < outputs.length; z++) {
        const o = outputs[z];
        adjustedOutputs.push(
          Object.assign({}, o, {
            address: !o.address ? fromAddress : o.address,
            value: o.value, //SATOSHI
            amount: satoshi_to_btc(o.value), //BTC
          })
        );
      }
      fees[feeType] = new BitcoinFee(fee, {
        fromUTXO: adjustedInputs,
        to: adjustedOutputs,
      });
    }
    //
    return fees;
  };
}
