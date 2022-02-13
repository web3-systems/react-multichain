import React from 'react';

import { Address, Balance } from '@web3-systems/react-evm';

import DeleteDocument from '../DeleteDocument';
const columns = [
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
    Header: 'Balance',
    accessor: 'balance',
    Cell: ({ value }: any) => (
      <Balance className="text-xs" amount={value} trim={6} />
    ),
  },
  {
    Header: 'Outbound TXs',
    accessor: 'nonce',
    Cell: ({ value }: any) => (
      <div className="">
        <span className="font-normal text-xs">{value && value}</span>
      </div>
    ),
  },
  {
    Header: 'Inbound TXs',
    accessor: 'inbound',
    Cell: ({ value }: any) => (
      <span className="font-normal text-xs">{value && value}</span>
    ),
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: ({ row }: any) => (
      <DeleteDocument table="accounts" id={row.original.address} chainId={1}>
        <span className="tag tag-red tag-sm cursor-pointer">Delete</span>
      </DeleteDocument>
    ),
  },
];

export default columns;
