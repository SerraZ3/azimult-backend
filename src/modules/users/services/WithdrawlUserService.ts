import ITransactionsRepository from "@modules/transactions/repositories/ITransactionsRepository";
import IBankProvider from "@shared/container/providers/BankProvider/models/IBankProvider";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import { inject, injectable } from "tsyringe";
import { ObjectID } from "typeorm";
import IUsersRepository from "../repositories/IUsersRepository";
import * as uuid from 'uuid';
import ICreateTransactionDTO from "@modules/transactions/dtos/ICreateTransactionDTO";
import Transaction from "@modules/transactions/infra/typeorm/schemas/Transaction";

interface IRequest {
  userId: ObjectID;
  value: number;
}

interface IResponse extends ISuccess {
  transaction: any;
}

@injectable()
class WithdrawlUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("BankProvider")
    private bankProvider: IBankProvider,

  ) { }

  public async execute({ userId, value }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);
    // ! Testar com api !
    // const pixCopyPaste = await this.banckProvider.generatePaymentPixCopyPaste(value)
    // console.log(pixCopyPaste)
    const pixCopyPaste = {
      trxId: "123"
    }
    const transactionData: ICreateTransactionDTO = {
      type: 'deposit',
      currencyA: 'brl',
      valueA: `${value}`,
      externalId: uuid.v4(),
      origin: 'bank',
      userId,
      trxId: pixCopyPaste.trxId,
    }
    let transaction = await this.transactionsRepository.create(transactionData)
    transaction = Object.assign(new Transaction(), transaction)
    transaction = transaction.toJSON()
    // tokens = tokens.map(token => token.toJSON())
    return {
      ...emitter.success("SUCCESS"),
      transaction
    };
  }
}

export default WithdrawlUserService;
