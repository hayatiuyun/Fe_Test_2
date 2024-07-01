import CustomTextField from "@/components/styled/TextField";
import { Box, Button, Typography, debounce } from "@mui/material";
import { IconSend2 } from "@tabler/icons-react";
import React, { useState } from "react";

const Forms = ({
  data,
  onClose,
  readonly,
  formType,
  rows,
  setRows
}: {
  data: any | null;
  onClose: () => void;
  readonly: boolean | undefined;
  formType: string;
  rows: any[];
  setRows: (value: any) => void;
}) => {
  const [ruas, setRuas] = useState(data?.ruas ?? "");
  const [gerbang, setGerbang] = useState(data?.gerbang ?? "");

  // function to change ruas and gerbang with debounce
  const handleChangeRuas = (e: any) => {
    setRuas(e.target.value);
  };

  const handleChangeGerbang = (e: any) => {
    setGerbang(e.target.value);
  };

  // function to submit data
  const onSubmit = () => {
    if (data) {
      const index = rows.findIndex((row) => row.id === data.id);
      const newRows = [...rows];
      newRows[index] = {
        ...newRows[index],
        ruas,
        gerbang,
      };
      setRows(newRows);
    } else {
      setRows([
        ...rows,
        {
          ruas,
          gerbang,
          id: rows.length + 1,
        },
      ]);
    }
    onClose();
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom className="capitalize">
          {formType} Data
        </Typography>

        {/* descriptions of forms, minimum 15 words */}
        <Typography variant="body2" gutterBottom>
          Enter or modify details for data gates with this form.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: 3,
          py: 2,
        }}
      >
        <CustomTextField
          label="Route"
          variant="outlined"
          onChange={handleChangeRuas}
          {...(data ? { value: ruas } : {})}
          fullWidth
          InputProps={{
            readOnly: readonly,
          }}
        />
        <CustomTextField
          InputProps={{
            readOnly: readonly,
          }}
          {...(data ? { value: gerbang } : {})}
          label="Gate"
          onChange={handleChangeGerbang}
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box
        display={"inline-flex"}
        flexWrap={"wrap"}
        gap={1}
        justifyContent="center"
        width="100%"
        mt={3}
      >
        <Button variant="outlined" onClick={onClose}>
          {readonly ? "Close" : "Cancel"}
        </Button>
        {!readonly && (
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            endIcon={<IconSend2 size={18} />}
          >
            {data ? "Update" : "Add"}
          </Button>
        )}
      </Box>
    </>
  );
};

export default Forms;