import MultiscanClient from '@web3-systems/multiscan-client';

import updateContractEntityFromScannerContractSourceCode from '../../utils/createContractEntityFromScannerContractSourceCode';

async function scannerBulkFetchContractMetaIfRequired(
  scanner: MultiscanClient | undefined,
  contracts: Array<any>,
  chainId: number
): Promise<any> {
  let entities = [];
  for (let index = 0; index < contracts.length; index++) {
    const contract = contracts[index];
    if (contract.abi === undefined) {
      const contractSourceCode = await scanner?.getContractSourceCode(
        contract.address,
        chainId
      );
      if (contractSourceCode !== undefined) {
        const _document = updateContractEntityFromScannerContractSourceCode(
          contract,
          contractSourceCode
        );
        entities.push(_document);
      }
    }
  }
  return entities;
}

export default scannerBulkFetchContractMetaIfRequired;
