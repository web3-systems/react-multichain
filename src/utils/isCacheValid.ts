import compareNonceToInboundTransactionsCount from './compareNonceToInboundTransactionsCount';
import compareNonceToOutboundTransactionsCount from './compareNonceToOutboundTransactionsCount';
import compareNonceToTotalTransactionsCount from './compareNonceToTotalTransactionsCount';

/**
 * @name isCacheValid
 * @description Compares nonce, transactions count, and account metadata to determin cache validity.
 * @param filter
 * @param nonce
 * @param txCount
 * @param accountMeta
 * @returns boolean Cache validity status
 */
function isCacheValid(
  filter: 'from' | 'to' | 'self' | 'all' = 'from',
  nonce: number,
  txCount: number,
  accountMeta: any
): boolean {
  let isTransactionsCached = false;
  switch (filter) {
    case 'from':
      isTransactionsCached = compareNonceToOutboundTransactionsCount(
        nonce,
        txCount
      );
      break;
    case 'to':
      isTransactionsCached = compareNonceToInboundTransactionsCount(
        nonce,
        txCount,
        accountMeta.total
      );
      break;
    case 'all':
      isTransactionsCached = compareNonceToTotalTransactionsCount(
        nonce,
        txCount,
        accountMeta.inbound
      );
      break;
    case 'self':
    default:
      return false;
  }
  return isTransactionsCached;
}

export default isCacheValid;
