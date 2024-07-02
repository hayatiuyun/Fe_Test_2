"use client";
import React, { Suspense, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import CustomTextField from "../styled/TextField";
import { IconChevronDown } from "@tabler/icons-react";
import { PaperComponent } from "../styled/PaperAutoComplete";
import DataGridTable from "./DataGrid";
import DatePickerMui from "../DatePicker";
import useTrafficReports from "@/hooks/useTrafficReports";
import { Traffic } from "@/types/traffics";
import { GerbangData } from "@/types/gerbang";

const ruasOptions = [
  { ruas_id: 1, ruas_nama: "Ruas 1" },
  { ruas_id: 2, ruas_nama: "Ruas 2" },
  { ruas_id: 3, ruas_nama: "Ruas 3" },
];

const gerbangOptions = [
  { gerbang_id: 1, gerbang_nama: "Gerbang 1" },
  { gerbang_id: 2, gerbang_nama: "Gerbang 2" },
  { gerbang_id: 3, gerbang_nama: "Gerbang 3" },
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
}

const TrafficReport = ({ data: dataRaw, gerbang }: TrafficReportProps) => {
  const [selectedRoutes, setSelectedRoutes] = useState<TypeOptions>(null);
  const [selectedGerbang, setSelectedGerbang] = useState<TypeOptions>(null);
  const [selectedGardu, setSelectedGardu] = useState<TypeOptions>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleRoutes = (event: any, value: any) => {
    setSelectedRoutes(value);
  };

  const handleGerbang = (event: any, value: any) => {
    setSelectedGerbang(value);
  };

  const handleGardu = (event: any, value: any) => {
    setSelectedGardu(value);
  };

  const { data, handleFilter, handleReset } = useTrafficReports(dataRaw);

  const onFilter = () => {
    handleFilter(
      {
        idcabang: selectedRoutes?.ruas_id,
        idgerbang: selectedGerbang?.gerbang_id,
        gardu: selectedGardu?.gardu,
        startDate,
        endDate,
      }
    );
  }

  console.log(gerbang);

  const onReset = () => {
    setSelectedGardu(null);
    setSelectedGerbang(null);
    setSelectedRoutes(null);
    setStartDate(new Date());
    setEndDate(new Date());
    handleReset();
  };

  const handleChangeStartDate = (date: any) => {
    setStartDate(date);
  };
  const handleChangeEndDate = (date: any) => {
    setStartDate(date);
  };

  const ruasOptions = (key: string) => [...new Map(gerbang.map(item =>
    [item[key], item])).values()]

    console.log("gerbangss", ruasOptions("gerbang_id"));
    

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
          alignItems="center"
        >
          {/* Autocomplete and Datepicker Filters (Ruas, Gerbang, Tanggal) */}
          <Autocomplete
            options={ruasOptions("ruas_id")}
            getOptionLabel={(option) => option.ruas_nama}
            fullWidth
            popupIcon={IconChevron}
            PaperComponent={PaperComponent}
            //   value={ruas}
            //   onChange={handleRuas}
            onChange={handleRoutes}
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
            options={ruasOptions("gerbang_id")}
            getOptionLabel={(option) => option.gerbang_nama}
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.gerbang_id === value.gerbang_id
            }
            popupIcon={IconChevron}
            PaperComponent={PaperComponent}
            onChange={handleGerbang}
            //   value={gerbang}
            //   onChange={handleGerbang}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Gates"
                variant="outlined"
                placeholder="Search Gate"
              />
            )}
          />
          <Autocomplete
            options={ruasOptions("gardu")}
            getOptionLabel={(option) => option.gardu.toString()}
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.gardu === value.gardu
            }
            popupIcon={IconChevron}
            PaperComponent={PaperComponent}
            onChange={handleGardu}
            //   value={gerbang}
            //   onChange={handleGerbang}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Gardu"
                variant="outlined"
                placeholder="Search Gardu"
              />
            )}
          />
          <Box width="100%" display="flex" alignItems="center">
            <DatePickerMui
              label="Start"
              variant="outlined"
              value={startDate}
              onChange={handleChangeStartDate}
            />
            <Typography variant="body2" gutterBottom px={1}>
              -
            </Typography>
            <DatePickerMui
              label="End"
              variant="outlined"
              value={endDate}
              onChange={handleChangeEndDate}
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
            <DataGridTable rows={data} />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default TrafficReport
