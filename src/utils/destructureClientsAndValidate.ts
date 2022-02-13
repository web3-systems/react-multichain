function destructureClientsAndValidate(clients: any) {
  if (typeof clients === 'undefined') {
    throw new Error('Clients Undefined');
  }
  const { scannerClient, providerClient, databaseClient } = clients;

  // if (
  //   typeof scannerClient === 'undefined' ||
  //   typeof providerClient === 'undefined' ||
  //   typeof databaseClient === 'undefined'
  // ) {
  //   throw new Error('Scanner/Provider/Database Undefined');
  // }

  return {
    scannerClient: scannerClient,
    providerClient: providerClient,
    databaseClient: databaseClient,
  };
}

export default destructureClientsAndValidate;
