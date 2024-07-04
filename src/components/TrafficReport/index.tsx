"use client";
import React, { Suspense, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
  debounce,
  styled,
} from "@mui/material";
import CustomTextField from "../styled/TextField";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { PaperComponent } from "../styled/PaperAutoComplete";
import DataGridTable from "./DataGrid";
import DatePickerMui from "../DatePicker";
import useTrafficReports from "@/hooks/useTrafficReports";
import { Traffic } from "@/types/traffics";
import { GerbangData } from "@/types/gerbang";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "date-fns";

const ruasOptions = [
  { IdCabang: 1, NamaCabang: "Ruas 1" },
  { IdCabang: 2, NamaCabang: "Ruas 2" },
  { IdCabang: 3, NamaCabang: "Ruas 3" },
];

const gerbangOptions = [
  { id: 1, NamaGerbang: "Gerbang 1" },
  { id: 2, NamaGerbang: "Gerbang 2" },
  { id: 3, NamaGerbang: "Gerbang 3" },
];

const garduOptions = [
  { gardu_id: 1, gardu_nama: "Gardu 1" },
  { gardu_id: 2, gardu_nama: "Gardu 2" },
  { gardu_id: 3, gardu_nama: "Gardu 3" },
];

interface options extends GerbangData {
  gardu: string;
}

type TypeOptions = options | null;

const IconChevron = <IconChevronDown size={20} className="text-gray-500" />;

const handleFilterClick = () => {
  console.log("Filter Clicked");
};

interface TrafficReportProps {
  data: { payment_method: string; data: Traffic[] }[];
  gerbang: any[];
  currentPage: number | any;
  totalPage: number | any;
  count: number | any;
}

const TrafficReport = ({ data: dataRaw, gerbang, currentPage, totalPage, count }: TrafficReportProps) => {
  const [date, setDate] = useState(new Date());
  
  const [search, setSearch] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const onSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("query", search.toString());
    params.set("date", formatDate(date, "yyyy-MM-dd"));
    replace(`${pathname}?${params.toString()}`);
    // setPage(value);
  }

  const { data, handleFilter, handleReset } = useTrafficReports(dataRaw);

  const onFilter = () => {
    onSearchParams();
  }

  console.log(gerbang);

  const onReset = () => {
    setSearch('');
    setDate(new Date());
    handleReset();
  };
  const handleChangeDate = (date: any) => {
    setDate(date);
  };

  const handleSearch = debounce((e: any) => {
    setSearch(e.target.value);
  }, 500);

  const ruasOptions = (key: string) => [...new Map(gerbang.map(item =>
    [item[key], item])).values()]

    console.log("gerbangss", ruasOptions("id"));
    

  return (
    <Box display="flex" flexDirection="column" gap={7} mt={5}>
      {/* Box Filter */}
      <Box>
        <Box
          display="flex"
          flexWrap={{
            xs: "wrap",
            lg: "nowrap",
          }}
          gap={2}
          alignItems="start"
        >
          {/* Autocomplete and Datepicker Filters (Ruas, Gerbang, Tanggal) */}
          <CustomTextField
            label="Search"
            variant="outlined"
            onChange={handleSearch}
            value={search}
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
          <Box width="100%" display="flex" alignItems="center">
            <DatePickerMui
              label="Date"
              variant="outlined"
              value={date}
              onChange={handleChangeDate}
            />
          </Box>
        </Box>
        <Box display="flex" gap={1} mt={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={onFilter}
          >
            Filter
          </Button>
          <Button color="primary" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {/* Table Datagrid with pagination */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Suspense
            fallback={
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={400}
              />
            }
          >
            <DataGridTable rows={data} current_page={currentPage} count={count} totalPage={totalPage}/>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default TrafficReport
