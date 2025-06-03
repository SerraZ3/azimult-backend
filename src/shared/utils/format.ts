const format = {
  transactionApi: (transaction: any) => {
    const newTransaction: any = {};
    if (transaction.currencyB) newTransaction.currencyB = transaction.currencyB;
    if (transaction.valueB) newTransaction.valueB = transaction.valueB;
    if (transaction.pixCopyPaste) newTransaction.pixCopyPaste = transaction.pixCopyPaste;
    if (transaction.wallet) newTransaction.wallet = transaction.wallet;
    if (transaction.url) newTransaction.url = transaction.url;
    transaction = {
      id: transaction.externalId,
      status: transaction.status,
      type: transaction.transactionType,
      currencyA: transaction.currency,
      valueA: transaction.value,
      ...newTransaction,
      createdAt: transaction.createdAt,
    };
    return transaction;
  },
};
export default format;
