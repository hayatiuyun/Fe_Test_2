// Create Component Box of Delete data Confirmation Modal

import { deleteDataGate } from "@/lib/data";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";

const DeleteConfirmations = ({
  onClose,
  data,
  rows,
  setRows,
}: {
  onClose: () => void;
  data: any;
  rows: any[];
  setRows: (value: any) => void;
}) => {
  // loading state
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await deleteDataGate(data);
      const updatedRows = rows.filter((row) => row.id !== data.id);
      setRows(updatedRows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delete data{" "}
        <span className="font-mono px-1.5 py-0.5 bg-[#ffd2ce] rounded-md text-[#f44336]">
          {data.NamaGerbang}
        </span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Are you sure you want to delete this item?
      </Typography>
      <div className="mt-4 flex justify-end">
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onSubmit}
          startIcon={
            loading && (
              <CircularProgress
                color="inherit"
                sx={{
                  width: "1.25rem !important",
                  height: "1.25rem !important",
                }}
              />
            )
          }
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </Box>
  );
};

export default DeleteConfirmations;
