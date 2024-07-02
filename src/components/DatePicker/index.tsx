import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers";
import CustomTextField from "../styled/TextField";
import { PaperComponent } from "../styled/PaperAutoComplete";

const DatePickerMui = (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        slots={{
          textField: CustomTextField,
          desktopPaper: PaperComponent,
        }}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerMui;
