// Create Component Box of Delete data Confirmation Modal

import { Box, Button, Typography } from "@mui/material";
import React from "react";

const DeleteConfirmations = ({
  onClose,
  onSubmit,
  data
}: {
  onClose: () => void;
  onSubmit: () => void;
  data: string
}) => (
  <Box>
    <Typography variant="h6" gutterBottom>
        Delete data <span className="font-mono px-1.5 py-0.5 bg-[#f44336] rounded-md text-white">{data}</span>
    </Typography>
    <Typography variant="body1" gutterBottom>
    Are you sure you want to delete this item?
    </Typography>
    <div className="mt-4 flex justify-end">
      <Button variant="text" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" color="error" onClick={onSubmit}>
        Delete
      </Button>
    </div>
  </Box>
);

export default DeleteConfirmations;
