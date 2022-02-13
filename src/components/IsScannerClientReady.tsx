import React, { ReactNode } from 'react';

import classNames from 'classnames';

import useIsScannerClientReady from '../hooks/core/useIsScannerClientReady';

interface IsScannerClientReadyProps {
  className?: string;
  classNameLabel?: string;
  classNameValue?: string;
  label?: string;
  IsReady: ReactNode;
  IsNotReady: ReactNode;
}

export const IsScannerClientReady = ({
  className,
  classNameLabel,
  classNameValue,
  label,
  IsReady,
  IsNotReady,
}: IsScannerClientReadyProps) => {
  const styleBase = classNames(className, 'IsScannerClientReady');
  const styleLabel = classNames(classNameLabel, 'IsScannerClientReady--label');
  const styleValue = classNames(classNameValue, 'IsScannerClientReady--value');

  const isScannerClientReady = useIsScannerClientReady();
  return (
    <div className={styleBase}>
      <span className={styleLabel}>{label}</span>
      <span className={styleValue}>
        {isScannerClientReady ? IsReady : IsNotReady}
      </span>
    </div>
  );
};

IsScannerClientReady.defaultProps = {
  label: 'Scanner: ',
  IsReady: '🟢',
  NotReady: '🔴',
};

export default IsScannerClientReady;
