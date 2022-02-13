function compareNonceToOutboundTransactionsCount(
  nonce: number,
  transactionCount: number
) {
  return nonce === transactionCount;
}

export default compareNonceToOutboundTransactionsCount;
