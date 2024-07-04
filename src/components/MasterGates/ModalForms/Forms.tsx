import { PaperComponent } from "@/components/styled/PaperAutoComplete";
import CustomTextField from "@/components/styled/TextField";
import { postDataGate, putDataGate } from "@/lib/data";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { IconDotsCircleHorizontal, IconSend2 } from "@tabler/icons-react";
import React, { useState } from "react";

const Forms = ({
  data,
  onClose,
  readonly,
  formType,
  rows,
  setRows,
}: {
  data: any | null;
  onClose: () => void;
  readonly: boolean | undefined;
  formType: string | null;
  rows: any[];
  setRows: (value: any) => void;
}) => {
  const [ruas, setRuas] = useState(data);
  const [gerbang, setGerbang] = useState(data?.NamaGerbang ?? "");
  const [loading, setLoading] = useState(false);
  // function to change ruas and gerbang with debounce
  const handleChangeRuas = (e: any, val: any) => {
    setRuas(val)
  };

  const handleChangeGerbang = (e: any) => {
    setGerbang(e.target.value);
  };

  // function to submit data with error handling exceptions
  const onSubmit = async () => {

    if (ruas === '' || gerbang === '') {
      console.log(ruas, gerbang,  "Ruas or Gerbang is empty");
      
      return;
    }
    setLoading(true);
    try {
      if (data) {
        await putDataGate({ NamaCabang: ruas, NamaGerbang: gerbang, ...data });
        const updatedRows = rows.map((row) =>
          row.id === data.id ? { ...row, NamaCabang: ruas.NamaCabang, NamaGerbang: gerbang } : row
        );
        setRows(updatedRows);
      } else {
        console.log("submit triggered");
        const newData = { ...ruas, NamaGerbang: gerbang, id: rows.length + 1, };
        await postDataGate(newData);
        setRows([...rows, newData]);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        <Autocomplete
          options={[
            { IdCabang: 16, NamaCabang
            : "Gedebage Cilacap" },
            { IdCabang: 37, NamaCabang: "Jogja Solo" },
          ]}
          getOptionLabel={(option) => option.NamaCabang}
          fullWidth
          readOnly={readonly}
          value={ruas}
          popupIcon={<IconDotsCircleHorizontal size={18} />}
          isOptionEqualToValue={(option, value) =>
            option.IdCabang === value.IdCabang}
          PaperComponent={PaperComponent}
          onChange={handleChangeRuas}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              label="Route"
              variant="outlined"
              placeholder="Search Route"
            />
          )}
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
            disabled={loading}
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
          >
            {/*  loading progress component */}

            {data ? "Update" : "Add"}
          </Button>
        )}
      </Box>
    </>
  );
};

export default Forms;
