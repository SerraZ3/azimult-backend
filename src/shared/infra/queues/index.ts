import queuesConfig from "@config/queues";
import ReferrerFeeQueueService from "@modules/transactions/services/ReferrerFeeQueueService";
import SendPixQueueService from "@modules/transactions/services/SendPixQueueService";

import WithdrawMonitoryBtcQueueService from "@modules/transactions/services/WithdrawMonitoryBtcQueueService";
import WithdrawMonitoryEthErc20QueueService from "@modules/transactions/services/WithdrawMonitoryEthErc20QueueService";
import WithdrawMonitoryEthQueueService from "@modules/transactions/services/WithdrawMonitoryEthQueueService";
import WithdrawMonitoryQueueService from "@modules/transactions/services/WithdrawMonitoryQueueService";
import WebhookSendQueueService from "@modules/webhooks/services/queues/WebhookSendQueueService";
import RabbitMQProvider from "@shared/container/providers/QueueProvider/implementations/RabbitMQProvider";

import Debug from "debug";
const debug = Debug("dev:infraQueues");

async function loop(msg: any): Promise<Boolean> {
  debug("=========================");
  debug(JSON.parse(msg.content.toString()));
  debug("=========================");

  throw new Error("Oi");
}

const queues = async () => {
  const createLoops = queuesConfig.createLoop;

  const queueProvider = new RabbitMQProvider();
  if (queuesConfig.queueUrl) {
    await queueProvider.connect({ url: queuesConfig.queueUrl });

    debug("Iniciando filas");
    // await queueProvider.consume({ handleIncomingNotification: WithdrawQueueService, queue: queuesConfig.queueName.withdraw, options: { prefetch: 1, maxPriority: 255 } });
    // if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawError, options: { prefetch: 1, maxPriority: 255 } });
    // await queueProvider.consume({ handleIncomingNotification: WithdrawBrokerQueueService, queue: queuesConfig.queueName.withdrawBroker, options: { prefetch: 1, maxPriority: 255 } });
    // if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawBrokerError, options: { prefetch: 1, maxPriority: 255 } });
    // await queueProvider.consume({ handleIncomingNotification: WithdrawBrokerAwaitQueueService, queue: queuesConfig.queueName.withdrawBrokerAwait, options: { prefetch: 1, maxPriority: 255 } });
    // await queueProvider.consume({ handleIncomingNotification: WithdrawBrokerSendQueueService, queue: queuesConfig.queueName.withdrawBrokerSend, options: { prefetch: 1, maxPriority: 255 } });
    // if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawBrokerSendError, options: { prefetch: 1, maxPriority: 255 } });
    await queueProvider.consume({ handleIncomingNotification: SendPixQueueService, queue: queuesConfig.queueName.sendPix, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.sendPixError, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.sendPixWebhookError, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.sendPixWebhookSendError, options: { prefetch: 1, maxPriority: 255 } });
    // withdraws
    await queueProvider.consume({ handleIncomingNotification: WithdrawMonitoryQueueService, queue: queuesConfig.queueName.withdrawMonitory, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawMonitoryError, options: { prefetch: 1, maxPriority: 255 } });
    await queueProvider.consume({ handleIncomingNotification: WithdrawMonitoryBtcQueueService, queue: queuesConfig.queueName.withdrawMonitoryBtc, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawMonitoryBtcError, options: { prefetch: 1, maxPriority: 255 } });
    await queueProvider.consume({ handleIncomingNotification: WithdrawMonitoryEthQueueService, queue: queuesConfig.queueName.withdrawMonitoryEth, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawMonitoryEthError, options: { prefetch: 1, maxPriority: 255 } });
    await queueProvider.consume({ handleIncomingNotification: WithdrawMonitoryEthErc20QueueService, queue: queuesConfig.queueName.withdrawMonitoryEthErc20, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.withdrawMonitoryEthErc20Error, options: { prefetch: 1, maxPriority: 255 } });

    await queueProvider.consume({ handleIncomingNotification: ReferrerFeeQueueService, queue: queuesConfig.queueName.referrerFee, options: { prefetch: 1, maxPriority: 255 } });
    if (createLoops) await queueProvider.consume({ handleIncomingNotification: loop, queue: queuesConfig.queueName.referrerFeeError, options: { prefetch: 1, maxPriority: 255 } });

    await queueProvider.consume({ handleIncomingNotification: WebhookSendQueueService, queue: queuesConfig.queueName.sendWebook, options: { prefetch: 1, maxPriority: 255 } });

    debug("Filas iniciadas");
  } else {
    debug("Url de filas não encontrado!!!!");
  }
};
export default queues;
