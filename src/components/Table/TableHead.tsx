import React from 'react';

import classNames from 'classnames';

interface TableHeadProps {
  headerGroups: any;
  className?: string;
  classNameHeader?: string;
  defaultStyle?: boolean;
}

export const TableHead = ({
  className,
  classNameHeader,
  headerGroups,
  defaultStyle,
}: TableHeadProps) => {
  const styleBase = classNames(className, {
    'bg-white rounded-xl shadow-sm border-b-2 border-blue-300 h-10 pb-2 z-10 text-lg': defaultStyle,
  });

  const styleHeader = classNames(classNameHeader, {
    'text-left px-3 font-semibold text-sm': defaultStyle,
    'text-left font-semibold text-sm': !defaultStyle,
  });

  return (
    <thead className={styleBase}>
      {headerGroups.map((headerGroup: any, ihg: any) => (
        <tr key={ihg} className="mt-1" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any, idx: number) => (
            <th
              key={idx}
              className={styleHeader}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <div className="flex items-center">
                <span className="">{column.render('Header')}</span>
                <span className="text-xxs ml-1">
                  {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : '  '}
                </span>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
export default TableHead;
