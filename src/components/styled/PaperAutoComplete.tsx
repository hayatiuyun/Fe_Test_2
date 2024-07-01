'use client';
import { Paper, styled } from "@mui/material";

export const PaperComponent = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "12px",
  marginTop: "0.5rem",
  border: "0.5px solid",
  borderColor: "#0107183b",
  padding: "0.5rem",
  boxShadow:
    "rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 10%) 0px 4px 6px -4px",

  "& .MuiAutocomplete-listbox": {
    "& .MuiAutocomplete-option": {
      borderRadius: "8px",
      padding: "0.5rem",
      marginY: "0.5rem",
    },
    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: theme.palette.primary.main,
      color: "white",

      "&.Mui-focused": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  },
  "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
    backgroundColor: theme.palette.primary.light,
    transition: "0.3s",
  },
}));
