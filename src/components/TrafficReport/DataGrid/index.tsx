import { useMemo, useState } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
import { exportToCsv, exportToPdf } from "@/utils/export";
import "react-data-grid/lib/styles.css";
import { IconSortAscending2 } from "@tabler/icons-react";
import { Button } from "@mui/material";
import NavTabs from "@/components/TrafficReport/Tab";
import Pagination from "@/components/Table/Pagination";

interface Row {
  id: number;
  ruas: string;
  gerbang: string;
  gardu: string;
  hari: string;
  tanggal: string;
  payment_methods: string;
  gol_1: number;
  gol_2: number;
  gol_3: number;
  gol_4: number;
  gol_5: number;
  total: number;
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

function getColumns(): Column<Row, any>[] {
  return [
    {
      key: "no",
      name: "No.",
      resizable: true,
      renderHeaderCell: SortHeader,
      frozen: true,
      renderSummaryCell() {
        return <strong>Total</strong>;
      },
    },
    {
      key: "ruas",
      name: "Route",
      resizable: true,
      renderHeaderCell: SortHeader,
      frozen: true,
    },
    {
      key: "gerbang",
      name: "Gerbang",
      resizable: true,
      renderHeaderCell: SortHeader,
      frozen: true,
    },
    {
      key: "gardu",
      name: "Gardu",
      resizable: true,
      renderHeaderCell: SortHeader,
      frozen: true,
    },
    { key: "hari", name: "Day", resizable: true, renderHeaderCell: SortHeader },
    {
      key: "tanggal",
      name: "Date",
      resizable: true,
      renderHeaderCell: SortHeader,
      frozen: true,
    },
    {
      key: "payment_methods",
      name: "Payment Method",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    {
      key: "gol_1",
      name: "Gol 1",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("gol_1");
      },
    },
    {
      key: "gol_2",
      name: "Gol 2",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("gol_2");
      },
    },
    {
      key: "gol_3",
      name: "Gol 3",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("gol_3");
      },
    },
    {
      key: "gol_4",
      name: "Gol 4",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("gol_4");
      },
    },
    {
      key: "gol_5",
      name: "Gol 5",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("gol_5");
      },
    },
    {
      key: "total",
      name: "Total",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("total");
      },
      renderCell: ({ row }) => {
        return row.gol_1 + row.gol_2 + row.gol_3 + row.gol_4 + row.gol_5;
      },
    },
  ];
}

type Comparator = (a: Row, b: Row) => number;

function getComparator(sortColumn: string): Comparator {
  // switch case sorting column
  switch (sortColumn) {
    case "ruas":
    case "gerbang":
    case "gardu":
    case "hari":
    case "tanggal":
    case "payment_methods":
      return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
    case "no":
    case "total":
    case "gol_1":
    case "gol_2":
    case "gol_3":
    case "gol_4":
    case "gol_5":
      return (a, b) => a[sortColumn] - b[sortColumn];
    default:
      return (a, b) => 0;
  }
}

export default function CommonFeatures({ rows: rowsTable }: { rows: Row[] }) {
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [page, setPage] = useState(0);

  const columns = useMemo(() => getColumns(), []);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rowsTable;

    return [...rowsTable].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rowsTable, sortColumns]);

  const pageRows = useMemo((): readonly Row[] => {
    const start = page * 10;
    const end = start + 10;
    return sortedRows.slice(start, end);
  }, [sortedRows, page]);

  const summaryRows = useMemo((): readonly SummaryRow[] => {
    return [
      {
        id: "total_0",
        totalCount: (key) => {
          switch (key) {
            case "gol_1":
              return rowsTable.reduce((acc, row) => acc + row.gol_1, 0);
            case "gol_2":
              return rowsTable.reduce((acc, row) => acc + row.gol_2, 0);
            case "gol_3":
              return rowsTable.reduce((acc, row) => acc + row.gol_3, 0);
            case "gol_4":
              return rowsTable.reduce((acc, row) => acc + row.gol_4, 0);
            case "gol_5":
              return rowsTable.reduce((acc, row) => acc + row.gol_5, 0);
            case "total":
              return rowsTable.reduce((acc, row) => acc + row.total, 0);
            default:
              return 0;
          }
        },
        yesCount: 6, // Adjust this based on your actual count
      },
    ];
  }, [rowsTable]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    setPage(value);
  };

  const handleExportCsv = async () => {
    await exportToCsv(gridElement, "CommonFeatures.csv");
  };

  const handleExportPdf = async () => {
    await exportToPdf(gridElement, "CommonFeatures.pdf");
  };

  const gridElement = (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={pageRows} // sortedRows of the page rows
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid"
      bottomSummaryRows={summaryRows}
    />
  );

  return (
    <>
      <div className="flex justify-between gap-4 flex-wrap items-center w-full">
        <div className="flex-1">
          <NavTabs />
        </div>
        <div className="inline-flex flex-wrap gap-4">
          <ExportButton onExport={handleExportCsv}>Export to CSV</ExportButton>
          <ExportButton onExport={handleExportPdf}>Export to PDF</ExportButton>
        </div>
      </div>
      {gridElement}
      <div className="w-full justify-end flex">
        <Pagination
          page={page}
          onPageChange={handleChangePage}
          total={Math.ceil(rowsTable.length / 10)}
        />
      </div>
    </>
  );
}

function ExportButton({
  onExport,
  children,
}: {
  onExport: () => Promise<unknown>;
  children: React.ReactNode;
}) {
  const [exporting, setExporting] = useState(false);

  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
    >
      {exporting ? "Exporting" : children}
    </Button>
  );
}
