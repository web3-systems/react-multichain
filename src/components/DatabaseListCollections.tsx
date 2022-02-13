import * as React from 'react';

import classNames from 'classnames';

import useDatabaseListCollections from '../hooks/inmemoryDB/useDatabaseGetCollections';

interface DatabaseListCollectionsProps {
  className?: string;
}

export const DatabaseListCollections = ({
  className,
}: DatabaseListCollectionsProps) => {
  const styleBase = classNames(className, '');
  const { data } = useDatabaseListCollections();

  return (
    <div className={styleBase}>
      {Array.isArray(data) &&
        data.map((item: any) => {
          return <div>{item.name}</div>;
        })}
    </div>
  );
};

export default DatabaseListCollections;
