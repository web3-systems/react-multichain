import React, { useMemo } from 'react';

import { useTable, usePagination, useExpanded, useSortBy } from 'react-table';

import { TableBody } from '../../Table/TableBody';
import { TableHead } from '../../Table/TableHead';
import { TablePagination } from '../../Table/TablePagination';
import columns from './Table.columns';

export interface ContractsTableProps {
  className?: string;
  classNameTable?: string;
  classNameHead?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameRow?: string;
  classNameCell?: string;
  classNamePagination?: string;
  classNamePaginationArrows?: string;
  data: Array<any>;
  address?: string;
}

function ContractsTable({
  className,
  classNameTable,
  classNameHead,
  classNameHeader,
  classNameBody,
  classNameRow,
  classNameCell,
  classNamePagination,
  classNamePaginationArrows,
  data,
}: ContractsTableProps) {
  const _data = useMemo(() => {
    if (typeof data === 'undefined') return [];
    if (Array.isArray(data)) return data;
    return [data];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<any>(
    {
      columns,
      data: _data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <div className={className}>
      <table className={classNameTable} {...getTableProps()}>
        <TableHead
          className={classNameHead}
          classNameHeader={classNameHeader}
          headerGroups={headerGroups}
        />
        <TableBody
          className={classNameBody}
          classNameRow={classNameRow}
          classNameCell={classNameCell}
          page={page}
          prepareRow={prepareRow}
          props={getTableBodyProps()}
        />
      </table>
      <TablePagination
        className={classNamePagination}
        classNameArrows={classNamePaginationArrows}
        pageSize={pageSize}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </div>
  );
}

export default ContractsTable;
