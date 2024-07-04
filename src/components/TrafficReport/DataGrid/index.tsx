import React, { useMemo, useState } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { Traffic } from "@/types/traffics";
import { exportToCsv, exportToPdf } from "@/utils/export";
import "react-data-grid/lib/styles.css";
import { IconCsv, IconPdf, IconSortAscending2 } from "@tabler/icons-react";
import { Button } from "@mui/material";
import NavTabs from "@/components/TrafficReport/Tab";
import Pagination from "@/components/Table/Pagination";
import useDataGridTraffic from "@/hooks/useDataGridTraffic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

interface GroupedData {
  payment_method: string;
  data: Traffic[];
}

interface DataGridTabsProps {
  rows: GroupedData[];
  current_page?: any;
  count?: any;
  totalPage?: any;
}

function rowKeyGetter(row: Traffic) {
  return row.id; // Ensure unique key for each row
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

function getColumns(): Column<Traffic, any>[] {
  return [
    {
      key: "no",
      name: "No.",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { id } }) => {
        return (<strong>{id}</strong>);
      },
    },
    {
      key: "Ruas",
      name: "Route",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    {
      key: "Gerbang",
      name: "Gerbang",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    {
      key: "Gardu",
      name: "Gardu",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    { key: "Hari", name: "Day", resizable: true, renderHeaderCell: SortHeader },
    {
      key: "Tanggal",
      name: "Date",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    {
      key: "payment_method",
      name: "Payment Method",
      resizable: true,
      renderHeaderCell: SortHeader,
    },
    {
      key: "Gol1",
      name: "Gol 1",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("Gol1");
      },
    },
    {
      key: "Gol2",
      name: "Gol 2",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("Gol2");
      },
    },
    {
      key: "Gol3",
      name: "Gol 3",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("Gol3");
      },
    },
    {
      key: "Gol4",
      name: "Gol 4",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("Gol4");
      },
    },
    {
      key: "Gol5",
      name: "Gol 5",
      resizable: true,
      renderHeaderCell: SortHeader,
      renderSummaryCell: ({ row: { totalCount } }) => {
        return totalCount("Gol5");
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
        return row.Gol1 + row.Gol2 + row.Gol3 + row.Gol4 + row.Gol5;
      },
    },
  ];
}
type Comparator = (a: Traffic, b: Traffic) => number;

function getComparator(sortColumn: string): Comparator {
  // switch case sorting column
  switch (sortColumn) {
    case "Ruas":
    case "Gerbang":
    case "Hari":
    case "Tanggal":
    case "payment_method":
      return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
    case "no":
    case "Gardu":
    case "total":
    case "Gol1":
    case "Gol2":
    case "Gol3":
    case "Gol4":
    case "Gol5":
      return (a, b) => a[sortColumn] - b[sortColumn];
    default:
      return (a, b) => 0;
  }
}

const DataGridTabs: React.FC<DataGridTabsProps> = ({ rows, count, totalPage, current_page }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [page, setPage] = useState(current_page || 0);
  const newRows = useDataGridTraffic(rows[selectedTab]?.data)

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();



  console.log('Payments', rows);

  const handleChangeTab = (newValue: string) => {
    setSelectedTab(parseInt(newValue, 10));
  };

  const columns: Column<Traffic, any>[] = useMemo(() => getColumns(), []);

  const rowsTable = useMemo(() => newRows, [rows, selectedTab]);
  console.log(rowsTable);

  const sortedRows = useMemo((): readonly Traffic[] => {
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
  

  const summaryRows = useMemo((): readonly SummaryRow[] => {
    return [
      {
        'id': 'Total Ruas Gedebage Cilacap',
        totalCount: (key) => {
          switch (key) {
            case 'Gol1':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.Gol1, 0);
            case 'Gol2':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.Gol2, 0);
            case 'Gol3':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.Gol3, 0);
            case 'Gol4':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.Gol4, 0);
            case 'Gol5':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.Gol5, 0);
            case 'total':
              return rowsTable?.filter((item: any) => item.IdCabang === 16)?.reduce((acc: any, row: any) => acc + row.total, 0);
            default:
              return 0;
          }
        },
        yesCount: 6, // Adjust this based on your actual count
      },
      {
        'id': 'Total Ruas Jogja Solo',
        totalCount: (key) => {
          switch (key) {
            case 'Gol1':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.Gol1, 0);
            case 'Gol2':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.Gol2, 0);
            case 'Gol3':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.Gol3, 0);
            case 'Gol4':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.Gol4, 0);
            case 'Gol5':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.Gol5, 0);
            case 'total':
              return rowsTable?.filter((item: any) => item.IdCabang === 37)?.reduce((acc: any, row: any) => acc + row.total, 0);
            default:
              return 0;
          }
        },
        yesCount: 6, // Adjust this based on your actual count
      },
      {
        id: "Total Keseluruhan",
        totalCount: (key) => {
          switch (key) {
            case "Gol1":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.Gol1, 0);
            case "Gol2":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.Gol2, 0);
            case "Gol3":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.Gol3, 0);
            case "Gol4":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.Gol4, 0);
            case "Gol5":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.Gol5, 0);
            case "total":
              return rowsTable?.reduce((acc: any, row: any) => acc + row.total, 0);
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
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    replace(`${pathname}?${params.toString()}`);
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
      rows={sortedRows} // sortedRows of the page rows
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
      <div className="w-full flex justify-between flex-wrap gap-5">
        <div className="flex-1">
          <NavTabs
            menus={rows}
            value={selectedTab}
            onChange={handleChangeTab}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <ExportButton onExport={handleExportCsv}>
            <IconCsv />
          </ExportButton>
          <ExportButton onExport={handleExportPdf}>
            <IconPdf />
          </ExportButton>
        </div>
      </div>
      {gridElement}
      <div className="w-full justify-end flex">
        <Pagination
          page={page}
          onPageChange={handleChangePage}
          total={totalPage}
        />
      </div>
    </>
  );
};

export default DataGridTabs;

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
      variant="outlined"
      color="primary"
      type="button"
      disabled={exporting}
      size="small"
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
