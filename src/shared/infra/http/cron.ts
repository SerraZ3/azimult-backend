// import UpdateSignaturePaymentsService from '@modules/payments/services/UpdateSignaturePaymentsService';
// import UpdateUserFreeCreditsService from '@modules/userCredits/services/UpdateUserFreeCreditsService';
import TransactionCancelPendingService from "@modules/transactions/services/TransactionCancelPendingService";
import { CronJob } from "cron";
import { container } from "tsyringe";

var resetCredits = new CronJob(
  // '0 0 1 * *', // Por uma vez por mes
  "* 1 * * *",
  async () => {
    const transactionCancelPendingService = container.resolve(TransactionCancelPendingService);
    await transactionCancelPendingService.execute();
  },
  null,
  true,
  "America/Sao_Paulo"
);

const cron = () => {
  resetCredits.start();
  console.log(`✅ Cron is ready`);
};
export default cron;
