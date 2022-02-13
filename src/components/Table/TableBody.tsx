import React from 'react';

import classNames from 'classnames';

import Component from '../Component';

interface TableBodyProps {
  className?: any;
  classNameRow?: any;
  classNameCell?: any;
  defaultStyle?: boolean;
  page: Array<any>;
  props: any;
  prepareRow: any;
  rowExpanded?: any;
}

/**
 * @name TableBody
 * @param {Object} props
 */
export const TableBody = ({
  classNameRow,
  classNameCell,
  defaultStyle,
  page,
  prepareRow,
  rowExpanded,
  ...props
}: TableBodyProps) => {
  const styleCell = classNames('cell', classNameCell, {
    'border-b-1 border-gray-100 py-2 px-4': defaultStyle,
  });

  return (
    <tbody {...props} className="z-">
      {page.map((row, idx) => {
        prepareRow(row);
        const styleRow = classNames('row', classNameRow, {
          'bg-gray-50 text-gray-500': row.original.disabled,
        });
        return (
          <>
            <tr {...row.getRowProps()} className={styleRow} key={idx}>
              {row.cells.map((cell: any, cIdx: number) => {
                return (
                  <td key={cIdx} className={styleCell} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
            {row.isExpanded ? (
              <tr>
                <td colSpan={row.cells.length}>
                  {row.isExpanded && Component(rowExpanded, { row })}
                </td>
              </tr>
            ) : null}
          </>
        );
      })}
    </tbody>
  );
};
export default TableBody;
