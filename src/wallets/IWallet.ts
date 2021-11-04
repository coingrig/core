import { GenericTxProposal } from '../fees/GenericTxProposal';

export interface IWallet {
  getBalance(): Promise<string>;
  getTxSendProposals(destination: string, valueToSend: any): Promise<any>;
  getAddress(): any;
  postTxSend(transactionProposal: GenericTxProposal) : Promise<any>;
}
