function compareNonceToInboundTransactionsCount(
  nonce: number,
  allTransactionCount: number,
  inboundCountCached: number
) {
  return nonce + inboundCountCached === allTransactionCount;
}

export default compareNonceToInboundTransactionsCount;
