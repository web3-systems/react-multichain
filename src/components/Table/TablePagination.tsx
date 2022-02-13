import React, { ReactElement } from 'react';

import classNames from 'classnames';

interface TablePaginationProps {
  className?: string;
  classNameArrows?: string;
  canPreviousPage: Boolean;
  canNextPage: Boolean;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  pageOptions: any;
  gotoPage: Function;
  nextPage: Function;
  previousPage: Function;
  setPageSize: Function;
}

/**
 * @name TablePagination
 * @param {Object} props
 */
export const TablePagination = ({
  className,
  classNameArrows,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageOptions,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}: TablePaginationProps): ReactElement => {
  const styleBase = classNames(className, 'table--pagination');
  const styleArrows = classNames(classNameArrows, 'table--pagination-arrows');

  return (
    <div className={styleBase}>
      <div className="">
        <button
          className={styleArrows}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          className={styleArrows}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          className={styleArrows}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          className={styleArrows}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span className="mx-2 text-xs">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        |
        <span className="tag tag-cloud px-2 mx-2">
          <span className="p-2">
            Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>
        </span>
      </div>
      <div className="">
        <select
          className="tag tag-cloud text-md"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[3, 5, 10, 20, 30, 40, 50].map(pageSizeParams => (
            <option
              className="text-xl"
              key={pageSizeParams}
              value={pageSizeParams}
            >
              Show {pageSizeParams}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default TablePagination;
