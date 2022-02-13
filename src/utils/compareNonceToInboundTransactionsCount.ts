function compareNonceToInboundTransactionsCount(
  nonce: number,
  inboundTransactionCount: number,
  cachedTotal: number
) {
  return nonce + inboundTransactionCount === cachedTotal;
}

export default compareNonceToInboundTransactionsCount;
