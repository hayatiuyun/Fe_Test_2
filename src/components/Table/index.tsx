"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  GridPagination,
  GridSlotsComponentsProps,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import { IconEdit, IconEraser, IconEye } from "@tabler/icons-react";

interface TableProps {
  columns: GridColDef[];
  rows: any[];
  pagination?: boolean;
  pageSizeOptions?: number;
  pageSize: number;

  withActions?: boolean;
  withPagination?: boolean;
  footer?: React.FC | null;

  onSelectDataEdit?: (data: any) => void;
  onOpenModalForm?: () => void;
  onOpenViewMode?: () => void;
  onOpenDeleteModal?: () => void;
}

interface ModalPhotoProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    rows: any[];
  }
}

// const useStyles = makeStyles({
//   root: {
//     '& .pinnedRow': {
//       backgroundColor: '#f0f0f0',  // Example background color for pinned rows
//       position: 'sticky',
//       top: 0, // Adjust based on your header height
//       zIndex: 1, // Ensure it stays above other rows
//     },
//   },
// });

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      variant="outlined"
      shape="rounded"
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const ModalPhoto = ({ open, onClose, url }: ModalPhotoProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Photo</DialogTitle>
      <DialogContent>
        <img
          src={`https://placehold.co/600x400?text=${url}`}
          width={1280}
          height={1280}
          alt="photo"
          className="w-full"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// Footer Component with props, children, display summary total traffic
const Footer = (props: NonNullable<GridSlotsComponentsProps["footer"]>) => {
  const { rows } = props;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <strong>Total Rows: {rows?.length}</strong>
        </div>
        <div>
          <strong>
            Total Traffic:{" "}
            {rows?.reduce((acc, row) => {
              const total = Object.keys(row).reduce((acc, key) => {
                if (key.startsWith("gol_")) {
                  acc += row[key];
                }
                return acc;
              }, 0);
              return acc + total;
            }, 0)}
          </strong>
        </div>
      </div>

      {/* 
    render pagination
    */}
      <div className="flex justify-end">
        <CustomPagination {...props} />
      </div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({
  rows,
  pageSize = 5,
  withActions = false,
  withPagination = true,
  footer = null,
  onSelectDataEdit = () => {},
  onOpenModalForm = () => {},
  onOpenViewMode = () => {},
  onOpenDeleteModal = () => {},
}) => {
  const [openPhotoModal, setOpenPhotoModal] = useState<boolean>(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>("");

  const onOpenModal = (url: string) => {
    setCurrentPhotoUrl(url);
    setOpenPhotoModal(true);
  };

  const handleEdit = (rowData: any, isView: boolean) => {
    console.log(rowData);

    onSelectDataEdit(rowData.id);
    if (isView) onOpenViewMode();
    onOpenModalForm();
  };

  const defaultColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 90,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        console.log(row);
        return `${row.no}`;
      },
    },
    {
      field: "ruas",
      headerName: "Routes",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },

    {
      field: "gerbang",
      headerName: "Gerbang",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gardu",
      headerName: "Gardu",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hari",
      headerName: "Hari",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      width: 120,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "payment_methods",
      headerName: "Metode Pembayaran",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gol_1",
      headerName: "Gol 1",
      width: 120,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gol_2",
      headerName: "Gol 2",
      width: 120,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gol_3",
      headerName: "Gol 3",
      width: 120,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gol_4",
      headerName: "Gol 4",
      width: 120,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gol_5",
      headerName: "Gol 5",
      width: 120,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total Traffic",
      width: 250,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        const total = Object.keys(row).reduce((acc, key) => {
          if (key.startsWith("gol_")) {
            acc += row[key];
          }
          return acc;
        }, 0);
        return total;
      },
    },
  ];

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 175,
    resizable: false,
    filterable: false,
    disableColumnMenu: true,
    disableReorder: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <div>
        <IconButton onClick={() => handleEdit(row, false)}>
          <IconEdit size={24} />
        </IconButton>
        <IconButton onClick={() => handleEdit(row, true)}>
          <IconEye />
        </IconButton>
        <IconButton
          onClick={() => {
            onSelectDataEdit(row.id);
            onOpenDeleteModal();
          }}
        >
          <IconEraser size={24} />
        </IconButton>
      </div>
    ),
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <ModalPhoto
          open={openPhotoModal}
          onClose={() => setOpenPhotoModal(false)}
          url={currentPhotoUrl}
        />
      </div>
      <DataGrid
        rows={[
          ...rows.map((row, index) => ({ ...row, no: index + 1 })),
          {
            id: "total",
            ruas: "Total",
            gerbang: "",
            gardu: "",
            hari: "",
            tanggal: "",
            payment_methods: "",
            gol_1: rows.reduce((acc, row) => acc + row.gol_1, 0),
            gol_2: rows.reduce((acc, row) => acc + row.gol_2, 0),
            gol_3: rows.reduce((acc, row) => acc + row.gol_3, 0),
            gol_4: rows.reduce((acc, row) => acc + row.gol_4, 0),
            gol_5: rows.reduce((acc, row) => acc + row.gol_5, 0),
            total: rows.reduce((acc, row) => acc + row.total, 0),
          },
        ]} // add id to each row
        columns={
          withActions ? [...defaultColumns, actionColumn] : defaultColumns
        }
        slots={{
          pagination: CustomPagination,
          footer: Footer,
        }}
        slotProps={{
          pagination: {
            className: "flex justify-end",
          },
          footer: {
            rows,
          },
        }}
        sortingOrder={["asc", "desc"]}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        hideFooter={false}
        //  add classname bg-white sticky top-0 z-10 add row total
        getRowClassName={(params) => {
          if (params.id === "total") {
            return "bg-white sticky top-0 z-10";
          }
          return "";
        }}
        pageSizeOptions={[5, 10, 20]}
        autoHeight
        disableColumnFilter
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Table;
