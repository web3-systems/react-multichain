import * as React from 'react';

import classNames from 'classnames';

import useIndexedDBEntityDelete from '../../hooks/indexedDB/useIndexedDBEntityDelete';

interface DeleteDocumentProps {
  children: React.ReactNode;
  className?: string;
  table: string;
  id: string;
  chainId?: number;
}

export const DeleteDocument = ({
  children,
  className,
  table,
  id,
  chainId,
}: DeleteDocumentProps) => {
  const styleBase = classNames(className, '');
  const { action } = useIndexedDBEntityDelete(table, id, chainId);
  return (
    <span className={styleBase} onClick={action}>
      {children}
    </span>
  );
};

export default DeleteDocument;
