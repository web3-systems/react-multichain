import * as React from 'react';

import classNames from 'classnames';

import { useBulkConstructContract } from '../../hooks/';

interface ContractsAddressListSearchAndImportProps {
  children: React.ReactNode;
  className?: string;
  addresses: string[];
  keywords: string[];
  chainId?: number;
}

export const ContractsAddressListSearchAndImport = ({
  children,
  className,
  addresses,
  keywords,
  chainId = 1,
}: ContractsAddressListSearchAndImportProps) => {
  const styleBase = classNames(
    className,
    'ContractsAddressListSearchAndImport'
  );
  const { action } = useBulkConstructContract(addresses, keywords, chainId);

  return (
    <span onClick={action} className={styleBase}>
      {children}
    </span>
  );
};

export default ContractsAddressListSearchAndImport;
