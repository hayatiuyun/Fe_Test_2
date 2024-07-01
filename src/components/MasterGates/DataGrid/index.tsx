"use client";
import { useMemo, useState, useEffect } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
// import react data grid css
import "react-data-grid/lib/styles.css";
import {
  IconEdit,
  IconEye,
  IconSortAscending2,
  IconTrash,
} from "@tabler/icons-react";
import Pagination from "@/components/Table/Pagination";
import { IconButton } from "@mui/material";

interface Row {
  id: number;
  ruas: string;
  gerbang: string;
  no: number;
}

function rowKeyGetter(row: Row) {
  return row.id.toString(); // Ensure unique key for each row
}

interface SummaryRow {
  id: string;
  totalCount: (key: string) => number;
  yesCount: number;
}

const SortHeader = ({ column, sortDirection }: any) => {
  return (
    <div className="inline-flex items-center w-full justify-between">
      {column.name}
      {sortDirection === "ASC" ? (
        <IconSortAscending2 size={16} />
      ) : sortDirection === "DESC" ? (
        <IconSortAscending2 size={16} className="rotate-180" />
      ) : null}
    </div>
  );
};

function getColumns({ onEdit, onDelete, onView }: any): Column<Row, any>[] {
  return [
    {
      key: "no",
      name: "No.",
      resizable: true,
      renderHeaderCell: SortHeader,
      sortable: true,
      frozen: true,
    },
    {
      key: "ruas",
      name: "Route",
      resizable: true,
      renderHeaderCell: SortHeader,
      sortable: true,
      frozen: true,
    },
    {
      key: "gerbang",
      name: "Gerbang",
      resizable: true,
      renderHeaderCell: SortHeader,
      sortable: true,
      frozen: true,
    },
    {
      key: "id",
      name: "Actions",
      renderHeaderCell: () => <div className="text-center w-full">Actions</div>,
      frozen: true,
      renderCell: ({ row }) => (
        <div className="flex justify-center">
          <IconButton onClick={() => onEdit(row)}>
            <IconEdit strokeWidth={1.35} />
          </IconButton>
          <IconButton onClick={() => onView(row)}>
            <IconEye strokeWidth={1.35} />
          </IconButton>
          <IconButton onClick={() => onDelete(row)}>
            <IconTrash strokeWidth={1.35} />
          </IconButton>
        </div>
      ),
    },
  ];
}

type Comparator = (a: Row, b: Row) => number;

function getComparator(sortColumn: string): Comparator {
  switch (sortColumn) {
    case "ruas":
    case "gerbang":
      return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
    case "no":
      return (a, b) => a[sortColumn] - b[sortColumn];
    default:
      return (a, b) => 0;
  }
}

export default function DataGridGates({
  rows: rowsTable,
  onEdit,
  onDelete,
  onView,
}: {
  rows: Row[];
  onEdit: (gate: any) => void;
  onDelete: (gate: any) => void;
  onView: (gate: any) => void;
}) {
  const [rows, setRows] = useState<Row[]>(rowsTable);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Update the rows state when rowsTable changes
    setRows(rowsTable);
  }, [rowsTable]);

  const columns = useMemo(
    () =>
      getColumns({
        onEdit,
        onDelete,
        onView,
      }),
    []
  );

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const pageRows = useMemo((): readonly Row[] => {
    const start = page * 10;
    const end = start + 10;
    return sortedRows.slice(start, end);
  }, [sortedRows, page]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    setPage(value);
  };

  const handleGridRowsUpdated = ({ fromRow, toRow, updated }: any) => {
    const updatedRows = [...rows];
    for (let i = fromRow; i <= toRow; i++) {
      updatedRows[i] = { ...updatedRows[i], ...updated };
    }
    setRows(updatedRows);
  };

  const gridElement = (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={pageRows} // Use pageRows for the visible rows
      onRowsChange={handleGridRowsUpdated} // Handle updates internally
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid"
    />
  );

  return (
    <>
      {gridElement}
      <div className="w-full justify-end flex pt-4">
        <Pagination
          page={page}
          onPageChange={handleChangePage}
          total={Math.ceil(rows.length / 10)}
        />
      </div>
    </>
  );
}