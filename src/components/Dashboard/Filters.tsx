'use client';
import React, { useState } from "react";
// import { DatePicker, DateRangePicker } from "@nextui-org/react";
import { Autocomplete, Button, Paper, styled } from "@mui/material";
import CustomTextField from "../styled/TextField";
import { IconChevronDown } from "@tabler/icons-react";
import { PaperComponent } from "../styled/PaperAutoComplete";
import { format, DateValues, formatDate } from 'date-fns';
import DatePickerMui from "../DatePicker";

type FiltersProps = {
  handleFilter: (params: any) => void;
  handleReset: () => void;

};
const Filters = ({ handleFilter, handleReset }: FiltersProps) => {
  const [value, setValue] = useState(new Date());
  const handleFilterClick = () => {
    handleFilter({
      date: formatDate(value, 'yyyy-MM-dd'),
    });
  };

  const handleChangeDate = (date: any) => {
    setValue(date);
  }

  const onReset = () => {
    setValue(new Date());
    handleReset();
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
      {/* Autocomplete and Datepicker Filters (Ruas, Gerbang, Tanggal) */}
      <DatePickerMui 
        value={value}
        onChange={handleChangeDate}
        label="Date"
        variant="outlined"
        
      />
      <div className="inline-flex gap-1">
        <Button color="primary" onClick={handleFilterClick} variant="contained">
          Filter
        </Button>
        <Button color="primary" variant="outlined" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
};

export default Filters;
