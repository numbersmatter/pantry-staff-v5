import { Link } from "@remix-run/react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";


type ApplicationRow = {
  id: string,
  user: {
    fname: string,
    lname: string,
    email: string,
    phone: string,
  },
  lname: string,
  fname: string,
  status: string,
  created_at: string,
  updated_at: string,
}


const data: ApplicationRow[] = [
  {
    id: "1",
    user: {
      fname: "John",
      lname: "Doe",
      email: "john.doe@example.com",
      phone: "555-555-5555",
    },
    lname: "Doe",
    fname: "John",
    status: "Pending",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    id: "2",
    user: {
      fname: "Jane",
      lname: "Doe",
      email: "jane.doe@example.com",
      phone: "555-555-5555",
    },
    lname: "Smith",
    fname: "Jane",
    status: "Approved",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
]


const columns: ColumnDef<ApplicationRow>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => row.original.lname + ", " + row.original.fname,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Application Date",
    cell: ({ row }) => row.original.created_at,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const viewUrl = `/applications/${row.original.id}`
      return (
        <div className="flex items-center">
          <Link to={viewUrl} className="">
            View
          </Link>
        </div>
      )
    }
  }
];


export function ApplicationsDataTable() {


  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
  })

  return (
    <div className="w-full max-w-6xl px-4 py-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter last name"
          value={(table.getColumn("lname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("lname")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

