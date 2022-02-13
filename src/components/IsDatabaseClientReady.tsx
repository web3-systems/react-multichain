import React, { ReactNode } from 'react';

import classNames from 'classnames';

import useIsDatabaseClientReady from '../hooks/core/useIsDatabaseClientReady';

interface IsDatabaseClientReadyProps {
  className?: string;
  classNameLabel?: string;
  classNameValue?: string;
  label?: string;
  IsReady: ReactNode;
  IsNotReady: ReactNode;
}

export const IsDatabaseClientReady = ({
  className,
  classNameLabel,
  classNameValue,
  label,
  IsReady,
  IsNotReady,
}: IsDatabaseClientReadyProps) => {
  const styleBase = classNames(className, 'IsDatabaseClientReady');
  const styleLabel = classNames(classNameLabel, 'IsDatabaseClientReady--label');
  const styleValue = classNames(classNameValue, 'IsDatabaseClientReady--value');

  const isDatabaseClientReady = useIsDatabaseClientReady();
  return (
    <div className={styleBase}>
      <span className={styleLabel}>{label}</span>
      <span className={styleValue}>
        {isDatabaseClientReady ? IsReady : IsNotReady}
      </span>
    </div>
  );
};

IsDatabaseClientReady.defaultProps = {
  label: 'Database: ',
  IsReady: '🟢',
  NotReady: '🔴',
};

export default IsDatabaseClientReady;
