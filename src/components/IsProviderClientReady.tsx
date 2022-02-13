import React, { ReactNode } from 'react';

import classNames from 'classnames';

import useIsProviderClientReady from '../hooks/core/useIsProviderClientReady';

interface IsProviderClientReadyProps {
  className?: string;
  classNameLabel?: string;
  classNameValue?: string;
  label?: string;
  IsReady: ReactNode;
  IsNotReady: ReactNode;
}

export const IsProviderClientReady = ({
  className,
  classNameLabel,
  classNameValue,
  label,
  IsReady,
  IsNotReady,
}: IsProviderClientReadyProps) => {
  const styleBase = classNames(className, 'IsProviderClientReady');
  const styleLabel = classNames(classNameLabel, 'IsProviderClientReady--label');
  const styleValue = classNames(classNameValue, 'IsProviderClientReady--value');

  const isProviderClientReady = useIsProviderClientReady();
  return (
    <div className={styleBase}>
      <span className={styleLabel}>{label}</span>
      <span className={styleValue}>
        {isProviderClientReady ? IsReady : IsNotReady}
      </span>
    </div>
  );
};

IsProviderClientReady.defaultProps = {
  label: 'Provider: ',
  IsReady: '🟢',
  NotReady: '🔴',
};

export default IsProviderClientReady;
