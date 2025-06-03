import ITransactionsRepository from "@modules/transactions/repositories/ITransactionsRepository";
import IBrokerProvider from "@shared/container/providers/BrokerProvider/models/IBrokerProvider";
import createMath from "@shared/utils/math";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import _ from "lodash";
import { inject, injectable } from "tsyringe";
const math = createMath();
interface IRequest {}

interface IResponse extends ISuccess {
  data?: any;
}

@injectable()
class AdminYieldService {
  constructor(
    @inject("BrokerProvider")
    private brokerProvider: IBrokerProvider,
    @inject("TransactionsRepository")
    private transactionRepository: ITransactionsRepository
  ) {}

  public async execute({}: // roles
  IRequest): Promise<IResponse> {
    let transactions = await this.transactionRepository.findAllToUpdate();
    if (!transactions) {
      return { ...emitter.success("SUCCESS") };
    }
    // ================= IN =======================
    const _in = _.filter(transactions, { transactionType: "in", status: "success" });
    const _inPending = _.filter(transactions, { transactionType: "in", status: "pending" });
    const totalYields: any = {
      brl: "0",
      eth: "0",
      btc: "0",
      usdt: "0",
    };

    const balanceTotalIn = _.reduce(_in, (total, num: any) => math.sum(total, num.value), "0");
    const feeBankIn = _.reduce(_in, (total, num: any) => math.sum(total, num.otherFee || "0"), "0");

    const infoIn = {
      total: _in.length,
      totalPending: _inPending.length,
      totalBalance: balanceTotalIn,
      feeBankIn,
    };

    // ================= OUT =======================
    const _out = _.filter(transactions, { transactionType: "out" });
    const keyOut = ["btc", "eth", "usdt"];
    const dataOut: any = {};
    for (let i = 0; i < keyOut.length; i++) {
      const currKey = keyOut[i];
      const _outList = _.filter(_out, { currency: currKey, status: "success" });
      const _outListPending = _.filter(_out, { currency: currKey, status: "pending" });
      const platformFee = _.reduce(_outList, (total, num: any) => math.sum(total, num.platformFee || "0"), "0");
      const totalValue = _.reduce(_outList, (total, num: any) => math.sum(total, num.value || "0"), "0");
      totalYields[currKey] = math.sum(totalYields[currKey], platformFee);
      dataOut[currKey] = {
        total: _outList.length,
        totalPending: _outListPending.length,
        platformFee: platformFee,
        outTotal: totalValue,
      };
    }

    const infoOut = {
      coins: keyOut,
      total: _out.length,
      data: dataOut,
    };

    // ================= Balance BrasilBTc =======================
    const balanceUser: any = await this.brokerProvider.getBalance();
    // ================= SWAP =======================
    const _swap = _.filter(transactions, { transactionType: "swap" });
    const keySwap = ["btc", "eth", "usdt", "brl"];
    const dataSwap: any = {};
    for (let i = 0; i < keySwap.length; i++) {
      const currKey = keySwap[i];
      const _swapList = _.filter(_swap, { currency: currKey, status: "success" });
      const _swapListPending = _.filter(_swap, { currency: currKey, status: "pending" });
      let platformFee = "0";

      let swapTotal = "0";
      if (currKey === "brl") {
        platformFee = _.reduce(_swapList, (total, num: any) => math.sum(total, num.platformFee || "0"), "0");
        swapTotal = _.reduce(_swapList, (total, num: any) => math.sum(total, num.value || "0"), "0");
        balanceUser[currKey] = math.sub(balanceUser[currKey], platformFee);
      } else {
        platformFee = _.reduce(_swapList, (total, num: any) => math.sum(total, num.platformFee || "0"), "0");
        swapTotal = _.reduce(_swapList, (total, num: any) => math.sum(total, num.value || "0"), "0");
        balanceUser[currKey] = math.sub(balanceUser[currKey], platformFee);
      }
      totalYields[currKey] = math.sum(totalYields[currKey], platformFee);
      // const totalValue = _.reduce(_swapList, (total, num:any) => math.sum(total, num.value || "0"), "0");
      dataSwap[currKey] = {
        total: _swapList.length,
        totalPending: _swapListPending.length,
        platformFee,
        swapTotal,
        // outTotal: totalValue,
      };
    }
    const infoSwap = {
      coins: keySwap,
      total: _swap.length,
      data: dataSwap,
    };

    return { ...emitter.success("SUCCESS"), data: { in: infoIn, out: infoOut, swap: infoSwap, userBalance: balanceUser, totalYields } };
  }
}

export default AdminYieldService;
