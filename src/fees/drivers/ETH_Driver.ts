import { IFeeMap, FEE_TYPES } from '../IFee';
import { GenericDriver } from '../GenericDriver';
import { EthereumFee } from "../types/EthereumFee";
import axios from 'axios';
import { TransactionConfig } from 'web3-core';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import {
  TRANSFER_METHOD_ABI,
} from '../../constants';

export class ETH_Driver extends GenericDriver {
  getTxSendProposals = async (destination: string, valueToSend: number) => {
    const currency = this.assetConfig.symbol!;
    const privateKey = this.assetConfig.privKey!;
    const config: object = {
      method: 'get',
      url: this.getFeeEndpoint(),
    };
    const response = await axios(config);
    const data = response.data;
    // {
    // "fast": 2080.0,
    // "fastest": 2510.0,
    // "safeLow": 1630.0,
    // "average": 1810.0,
    // "block_time": 10.485714285714286,
    // "blockNum": 13180279,
    // "speed": 0.515824565090043,
    // "safeLowWait": 9.8,
    // "avgWait": 1.0,
    // "fastWait": 0.5,
    // "fastestWait": 0.4,
    // }

    let fees = <IFeeMap>{}
    
    let body = {
      to: destination,
      amount: valueToSend,
      currency: currency,
      fee: {
        gasLimit: (currency === 'ETH') ? 40000 : null,
        gasPrice: (data.average / 10).toString(),
      },
      fromPrivateKey: privateKey
    };

    let proposal = await this.buildProposal(body);

    fees[FEE_TYPES.REGULAR] = new EthereumFee(proposal);

    body = {
      to: destination,
      amount: valueToSend,
      currency: currency,
      fee: {
        gasLimit: (currency === 'ETH') ? 40000 : null,
        gasPrice: (data.fast / 10).toString(),
      },
      fromPrivateKey: privateKey
    };

    proposal = await this.buildProposal(body);

    fees[FEE_TYPES.PRIORITY] = new EthereumFee(proposal);
    return <IFeeMap>fees;
  }  

  private async buildProposal(body: any) {
    const provider = new Web3.providers.HttpProvider(this.getProposalEndpoint());

    const {
      fromPrivateKey,
      to,
      amount,
      currency,
      fee,
      data,
      nonce,
      signatureId,
    } = body;

    const client = new Web3(provider);
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;

    let tx: TransactionConfig;
    if (currency === 'ETH') {
      tx = {
        from: 0,
        to: to.trim(),
        value: client.utils.toWei(`${amount}`, 'ether'),
        data: data
          ? client.utils.isHex(data)
            ? client.utils.stringToHex(data)
            : client.utils.toHex(data)
          : undefined,
        nonce,
      };
    } else {
      const contract = new client.eth.Contract(
        // @ts-ignore
        [TRANSFER_METHOD_ABI],
        this.assetConfig.contract
      );
      const digits = new BigNumber(10).pow(this.assetConfig.decimals);
      tx = {
        from: 0,
        to: this.assetConfig.contract!,
        data: contract.methods
          .transfer(
            to.trim(),
            `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`
          )
          .encodeABI(),
        nonce,
      };
    }

    const gasPrice = client.utils.toWei(fee.gasPrice, 'gwei');
    tx = {
      ...tx,
      gasPrice,
    };
  
    if (!signatureId) {
      tx.gas = fee?.gasLimit ?? (await client.eth.estimateGas(tx));
    } 

    return {
      signatureId: signatureId,
      fromPrivateKey: fromPrivateKey,
      fee: {
        gasLimit: tx.gas,
        gasPrice: fee.gasPrice,
      },
      proposal: signatureId ? JSON.stringify(tx) : tx,
    }
  }

  getProposalEndpoint() {
    const endpoint = this.config.proposal_endpoint;
    if (endpoint) {
      return endpoint;
    }
    throw new Error(this.currency + " Balance currency is required in config");
  }
}