import React, { useState } from 'react';

import { Address } from '@web3-systems/react-evm';
import { MoreHorizontal, Delete } from 'react-feather';
import { Popover } from 'react-tiny-popover';

import DeleteDocument from '../DeleteDocument';

// import DeleteDocument from '../DeleteDocument';
const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value, row }: any) => (
      <div className="">
        <span className="font-semibold text-xs">{value && value}</span>
        <span className="block">
          {row.original.ensName && (
            <span className="text-xs ml-1">({row.original.ensName})</span>
          )}
        </span>
      </div>
    ),
  },
  {
    Header: 'Address',
    accessor: 'address',
    Cell: ({ value, row }: any) => (
      <span className="">
        <Address className="font-normal text-xs" address={value} trim={10} />
        {row.original.ensName && (
          <span className="text-xs ml-1">({row.original.ensName})</span>
        )}
      </span>
    ),
  },
  {
    Header: 'Tags',
    accessor: 'keywords',
    Cell: ({ value }: any) => (
      <span className="font-normal text-xs">
        {value &&
          value.map((tag: string) => (
            <span className="tag tag-sm tag-blue mx-1">{tag}</span>
          ))}
      </span>
    ),
  },
  // {
  //   Header: 'Compiler',
  //   accessor: 'compiler',
  //   Cell: ({ value }: any) => (
  //     <span className="font-normal text-xs">{value && value}</span>
  //   ),
  // },
  // {
  //   Header: 'Runs',
  //   accessor: 'runs',
  //   Cell: ({ value }: any) => (
  //     <span className="font-normal text-xs">{value && value}</span>
  //   ),
  // },
  // {
  //   Header: 'IsProxy',
  //   accessor: 'proxy',
  //   Cell: ({ value }: any) => (
  //     <span className="font-normal text-xs">{value && value}</span>
  //   ),
  // },
  {
    Header: () => null,
    accessor: 'actions',
    Cell: ({ row }: any) => {
      const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
      return (
        <div className="flex justify-between items-center">
          <a href={`/contract/${row.original.address}`}>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
              View
            </span>
          </a>
          <Popover
            isOpen={isPopoverOpen}
            onClickOutside={() => setIsPopoverOpen(false)}
            positions={['bottom', 'left', 'right']} // preferred positions by priority
            content={
              <div className="card w-96">
                <div className="flex flex-col w-full">
                  <DeleteDocument
                    table="contracts"
                    id={row.original.address}
                    chainId={1}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs tag tag-red tag-sm cursor-pointer">
                        Delete
                      </span>
                      <Delete width={12} />
                    </div>
                  </DeleteDocument>
                </div>
              </div>
            }
          >
            <span
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="bg-white bg-opacity-20 ml-2 rounded-xl px-2 inline-block shrink w-24"
            >
              <MoreHorizontal width={14} />
            </span>
          </Popover>
        </div>
      );
    },
  },
];

export default columns;
