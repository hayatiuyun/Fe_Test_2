"use client";
import { Box, Button, Modal, Typography, debounce } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../styled/TextField";
import { IconSearch, IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import DataGridGates from "./DataGrid";
import ModalForms from "./ModalForms";
import Forms from "./ModalForms/Forms";
import DeleteConfirmations from "./ModalForms/Delete";
import { GerbangData } from "@/types/gerbang";
import { deleteDataGate } from "@/lib/data";

const dummyMasterGates = [
  {
    ruas: "Ruas 1",
    gerbang: "Gerbang 1",
    id: 1,
  },
  {
    ruas: "Ruas 2",
    gerbang: "Gerbang 2",
    id: 2,
  },
  {
    ruas: "Ruas 3",
    gerbang: "Gerbang 3",
    id: 3,
  },
  {
    ruas: "Ruas 4",
    gerbang: "Gerbang 4",
    id: 4,
  },
  {
    ruas: "Ruas 5",
    gerbang: "Gerbang 5",
    id: 5,
  },
  {
    ruas: "Ruas 6",
    gerbang: "Gerbang 6",
    id: 6,
  },
  {
    ruas: "Ruas 7",
    gerbang: "Gerbang 7",
    id: 7,
  },
  {
    ruas: "Ruas 8",
    gerbang: "Gerbang 8",
    id: 8,
  },
  {
    ruas: "Ruas 9",
    gerbang: "Gerbang 9",
    id: 9,
  },
  {
    ruas: "Ruas 10",
    gerbang: "Gerbang 10",
    id: 10,
  },
  {
    ruas: "Ruas 11",
    gerbang: "Gerbang 11",
    id: 11,
  },
  {
    ruas: "Ruas 12",
    gerbang: "Gerbang 12",
    id: 12,
  },
  {
    ruas: "Ruas 13",
    gerbang: "Gerbang 13",
    id: 13,
  },
  {
    ruas: "Ruas 14",
    gerbang: "Gerbang 14",
    id: 14,
  },
  {
    ruas: "Ruas 15",
    gerbang: "Gerbang 15",
    id: 15,
  },
  {
    ruas: "Ruas 16",
    gerbang: "Gerbang 16",
    id: 16,
  },
  {
    ruas: "Ruas 17",
    gerbang: "Gerbang 17",
    id: 17,
  },
  {
    ruas: "Ruas 18",
    gerbang: "Gerbang 18",
    id: 18,
  },
];

type TypeModalFormState = string | null;
type TypeSelectedGates = any | null;

type RowsGate = GerbangData[];

// create function search data gates
const searchGates = (data: any, query: string) => {
  return data.filter(
    (item: any) =>
      item.NamaCabang.toLowerCase().includes(query.toLowerCase()) ||
      item.NamaGerbang.toLowerCase().includes(query.toLowerCase())
  );
};

const MasterGates = ({data}: {data: [] | any}) => {

  const [modalFormState, setModalFormState] =
    useState<TypeModalFormState>(null);
  const [selectedGates, setSelectedGates] = useState<TypeSelectedGates>(null);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<RowsGate>(data);

  const handleAddData = () => {
    setModalFormState("add");
  };

  const handleCloseModalForm = () => {
    setModalFormState(null);
    setSelectedGates(null);
  };

  const handleEditGate = (gate: any) => {
    setSelectedGates(gate);
    setModalFormState("edit");
  };
  const handleDeleteGate = (gate: any) => {
    setSelectedGates(gate);
    setModalFormState("delete");
  };
  const handleViewGate = (gate: any) => {
    setSelectedGates(gate);
    setModalFormState("view");
  };

  const handleChangeQuery = debounce((e: any) => {
    const newRows = searchGates(data, e.target.value);
    setRows(newRows);
    setQuery(e.target.value);
  }, 1000);

  return (
    <Box mt={4} display="flex" flexDirection="column" gap={5}>
      {/* Search and Add Data Element Wrapped in Box */}
      <ModalForms
        isOpen={
          modalFormState === "add" ||
          modalFormState === "edit" ||
          modalFormState === "delete" ||
          modalFormState === "view"
        }
        onClose={handleCloseModalForm}
      >
        {modalFormState === "add" ||
        modalFormState === "edit" ||
        modalFormState === "view" ? (
          <Forms
            data={selectedGates}
            onClose={handleCloseModalForm}
            readonly={modalFormState === "view"}
            formType={modalFormState}
            setRows={setRows}
            rows={rows}
          />
        ) : modalFormState === "delete" ? (
          <DeleteConfirmations
            onClose={handleCloseModalForm}
            data={selectedGates}
            rows={rows}
            setRows={setRows}
          />
        ) : null}
      </ModalForms>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        gap={5}
        width={"100%"}
      >
        {/* Search Element */}
        {/* ------------------------------------------- */}
        <Box width="100%" flex={1}>
          <CustomTextField
            label="Search"
            variant="outlined"
            onChange={handleChangeQuery}
            fullWidth
            InputProps={{
              startAdornment: <IconSearch strokeWidth="1.5px" size={14} />,
              sx: {
                input: {
                  ml: 2,
                },
              },
            }}
          />
          <Typography variant="caption" color="textSecondary">
            {data.length} data found, {rows.length} data shown,
            query: {query}
          </Typography>
        </Box>
        {/* Search Element */}
        {/* ------------------------------------------- */}
        {/* Add Data Element */}
        {/* ------------------------------------------- */}
        <div className="">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddData}
            startIcon={
              <IconSquareRoundedPlusFilled size={20} className="mr-2" />
            }
          >
            Add Data
          </Button>
        </div>
        {/* Add Data Element */}
        {/* ------------------------------------------- */}
      </Box>
      <Box>
        {
          rows.length > 0 ? (
            <DataGridGates
              rows={rows.map((item, index) => ({...item, no: index + 1}))}
              onEdit={handleEditGate}
              onDelete={handleDeleteGate}
              onView={handleViewGate}
            />
          ) : (
            <Typography variant="h6" color="textSecondary">
              Data not found
            </Typography>
          )
        }
      </Box>
    </Box>
  );
};

export default MasterGates;
