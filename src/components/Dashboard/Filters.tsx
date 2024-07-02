'use client';
import React, { useState } from "react";
// import { DatePicker, DateRangePicker } from "@nextui-org/react";
import { Autocomplete, Button, Paper, styled } from "@mui/material";
import CustomTextField from "../styled/TextField";
import { IconChevronDown } from "@tabler/icons-react";
import { PaperComponent } from "../styled/PaperAutoComplete";
import { format, DateValues } from 'date-fns';
import DatePickerMui from "../DatePicker";

type FiltersProps = {
  options: any[];
  handleFilter: (params: any) => void;
  handleReset: () => void;

};
interface options {
  gerbang_id: number;
  gerbang_nama: string;
  ruas_id: number;
  ruas_nama: string;
}

type TypeOptions = options | null;

const Filters = ({ options, handleFilter, handleReset }: FiltersProps) => {
  const [value, setValue] = useState(new Date());
  const [ruas, setRuas] = useState<TypeOptions>(null);
  const [gerbang, setGerbang] =  useState<TypeOptions>(null);

  const IconChevron = <IconChevronDown size={20} className="text-gray-500" />;

  const handleRuas = (event: any, value: any) => {
    setRuas(value);
  };

  const handleGerbang = (event: any, value: any) => {
    setGerbang(value);
  };

  const handleFilterClick = () => {
    handleFilter({
      ruas: ruas?.ruas_id,
      gerbang: gerbang?.gerbang_id,
      date: value,
    });
  };

  const gerbangOptions =[...new Map(options.map(item => [item.gerbang_id, item])).values()]
  const ruasptions =[...new Map(options.map(item => [item.ruas_id, item])).values()]

  const handleChangeDate = (date: any) => {
    setValue(date);
  }

  const onReset = () => {
    setRuas(null);
    setGerbang(null);
    setValue(new Date());
    handleReset();
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
      {/* Autocomplete and Datepicker Filters (Ruas, Gerbang, Tanggal) */}
      <Autocomplete
        options={ruasptions}
        getOptionLabel={(option) => option.ruas_nama}
        fullWidth
        popupIcon={IconChevron}
        PaperComponent={PaperComponent}
        value={ruas}
        onChange={handleRuas}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Routes"
            variant="outlined"
            placeholder="Search Route"
          />
        )}
      />
      <Autocomplete
        options={gerbangOptions}
        getOptionLabel={(option) => option.gerbang_nama}
        fullWidth
        isOptionEqualToValue={(option, value) =>
          option.gerbang_id === value.gerbang_id
        }
        popupIcon={IconChevron}
        PaperComponent={PaperComponent}
        value={gerbang}
        onChange={handleGerbang}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Gates"
            variant="outlined"
            placeholder="Search Gate"
          />
        )}
      />
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
