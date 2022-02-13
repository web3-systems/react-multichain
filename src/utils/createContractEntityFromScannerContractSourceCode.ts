function updateContractEntityFromScannerContractSourceCode(
  document: object = {},
  contractSourceCode: any
) {
  const _document = Object.assign(document, {
    abi: contractSourceCode[0].ABI,
    bytecode: undefined,
    name: contractSourceCode[0].ContractName,
    license: contractSourceCode[0].LicenseType,
    compiler: contractSourceCode[0].CompilerVersion,
    runs: contractSourceCode[0].Runs,
    arguments: contractSourceCode[0].ConstructorArguments,
    proxy: contractSourceCode[0].Proxy,
  });
  return _document;
}

export default updateContractEntityFromScannerContractSourceCode;
