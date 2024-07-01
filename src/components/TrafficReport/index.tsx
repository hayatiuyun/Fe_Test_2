"use client";
import React from "react";
import { Button, DateRangePicker } from "@nextui-org/react";
import { Autocomplete, Box, Paper, styled } from "@mui/material";
import CustomTextField from "../styled/TextField";
import { IconChevronDown } from "@tabler/icons-react";
import { PaperComponent } from "../styled/PaperAutoComplete";
import DataGridTable from "./DataGrid";

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

const dummyData = [
  {
    id: 1,
    ruas: "Route A",
    gerbang: "Gerbang 1",
    gardu: "Gardu 1",
    hari: "Monday",
    tanggal: "2024-07-01",
    payment_methods: "Card",
    gol_1: 100,
    gol_2: 150,
    gol_3: 200,
    gol_4: 120,
    gol_5: 80,
    total: 650,
  },
  {
    id: 2,
    ruas: "Route B",
    gerbang: "Gerbang 2",
    gardu: "Gardu 2",
    hari: "Tuesday",
    tanggal: "2024-07-02",
    payment_methods: "Cash",
    gol_1: 80,
    gol_2: 110,
    gol_3: 180,
    gol_4: 90,
    gol_5: 70,
    total: 530,
  },
  {
    id: 3,
    ruas: "Route C",
    gerbang: "Gerbang 3",
    gardu: "Gardu 3",
    hari: "Wednesday",
    tanggal: "2024-07-03",
    payment_methods: "E-Money",
    gol_1: 120,
    gol_2: 130,
    gol_3: 220,
    gol_4: 150,
    gol_5: 100,
    total: 720,
  },
  {
    id: 4,
    ruas: "Route D",
    gerbang: "Gerbang 4",
    gardu: "Gardu 4",
    hari: "Thursday",
    tanggal: "2024-07-04",
    payment_methods: "Card",
    gol_1: 150,
    gol_2: 170,
    gol_3: 250,
    gol_4: 180,
    gol_5: 120,
    total: 870,
  },
  {
    id: 5,
    ruas: "Route E",
    gerbang: "Gerbang 5",
    gardu: "Gardu 5",
    hari: "Friday",
    tanggal: "2024-07-05",
    payment_methods: "Cash",
    gol_1: 90,
    gol_2: 100,
    gol_3: 200,
    gol_4: 110,
    gol_5: 60,
    total: 560,
  },
  {
    id: 6,
    ruas: "Route F",
    gerbang: "Gerbang 6",
    gardu: "Gardu 6",
    hari: "Saturday",
    tanggal: "2024-07-06",
    payment_methods: "E-Money",
    gol_1: 110,
    gol_2: 120,
    gol_3: 210,
    gol_4: 140,
    gol_5: 90,
    total: 670,
  },
  {
    id: 7,
    ruas: "Route G",
    gerbang: "Gerbang 7",
    gardu: "Gardu 7",
    hari: "Sunday",
    tanggal: "2024-07-07",
    payment_methods: "Card",
    gol_1: 130,
    gol_2: 140,
    gol_3: 230,
    gol_4: 160,
    gol_5: 110,
    total: 770,
  },
  {
    id: 8,
    ruas: "Route H",
    gerbang: "Gerbang 8",
    gardu: "Gardu 8",
    hari: "Monday",
    tanggal: "2024-07-08",
    payment_methods: "Cash",
    gol_1: 160,
    gol_2: 180,
    gol_3: 260,
    gol_4: 190,
    gol_5: 130,
    total: 920,
  },
  {
    id: 9,
    ruas: "Route I",
    gerbang: "Gerbang 9",
    gardu: "Gardu 9",
    hari: "Tuesday",
    tanggal: "2024-07-09",
    payment_methods: "E-Money",
    gol_1: 180,
    gol_2: 200,
    gol_3: 280,
    gol_4: 210,
    gol_5: 150,
    total: 1020,
  },
  {
    id: 10,
    ruas: "Route J",
    gerbang: "Gerbang 10",
    gardu: "Gardu 10",
    hari: "Wednesday",
    tanggal: "2024-07-10",
    payment_methods: "Card",
    gol_1: 200,
    gol_2: 220,
    gol_3: 300,
    gol_4: 230,
    gol_5: 170,
    total: 1120,
  },
  {
    id: 11,
    ruas: "Route K",
    gerbang: "Gerbang 11",
    gardu: "Gardu 11",
    hari: "Thursday",
    tanggal: "2024-07-11",
    payment_methods: "Cash",
    gol_1: 220,
    gol_2: 240,
    gol_3: 320,
    gol_4: 250,
    gol_5: 190,
    total: 1220,
  },
  {
    id: 12,
    ruas: "Route L",
    gerbang: "Gerbang 12",
    gardu: "Gardu 12",
    hari: "Friday",
    tanggal: "2024-07-12",
    payment_methods: "E-Money",
    gol_1: 240,
    gol_2: 260,
    gol_3: 340,
    gol_4: 270,
    gol_5: 210,
    total: 1320,
  },
  {
    id: 13,
    ruas: "Route M",
    gerbang: "Gerbang 13",
    gardu: "Gardu 13",
    hari: "Saturday",
    tanggal: "2024-07-13",
    payment_methods: "Card",
    gol_1: 260,
    gol_2: 280,
    gol_3: 360,
    gol_4: 290,
    gol_5: 230,
    total: 1420,
  },
  {
    id: 14,
    ruas: "Route N",
    gerbang: "Gerbang 14",
    gardu: "Gardu 14",
    hari: "Sunday",
    tanggal: "2024-07-14",
    payment_methods: "Cash",
    gol_1: 280,
    gol_2: 300,
    gol_3: 380,
    gol_4: 310,
    gol_5: 250,
    total: 1520,
  },
  {
    id: 15,
    ruas: "Route O",
    gerbang: "Gerbang 15",
    gardu: "Gardu 15",
    hari: "Monday",
    tanggal: "2024-07-15",
    payment_methods: "E-Money",
    gol_1: 300,
    gol_2: 320,
    gol_3: 400,
    gol_4: 330,
    gol_5: 270,
    total: 1620,
  },
  {
    id: 16,
    ruas: "Route P",
    gerbang: "Gerbang 16",
    gardu: "Gardu 16",
    hari: "Tuesday",
    tanggal: "2024-07-16",
    payment_methods: "Card",
    gol_1: 320,
    gol_2: 340,
    gol_3: 420,
    gol_4: 350,
    gol_5: 290,
    total: 1720,
  },
  {
    id: 17,
    ruas: "Route Q",
    gerbang: "Gerbang 17",
    gardu: "Gardu 17",
    hari: "Wednesday",
    tanggal: "2024-07-17",
    payment_methods: "Cash",
    gol_1: 340,
    gol_2: 360,
    gol_3: 440,
    gol_4: 370,
    gol_5: 310,
    total: 1820,
  },
  {
    id: 18,
    ruas: "Route R",
    gerbang: "Gerbang 18",
    gardu: "Gardu 18",
    hari: "Thursday",
    tanggal: "2024-07-18",
    payment_methods: "E-Money",
    gol_1: 360,
    gol_2: 380,
    gol_3: 460,
    gol_4: 390,
    gol_5: 330,
    total: 1920,
  },
  {
    id: 19,
    ruas: "Route S",
    gerbang: "Gerbang 19",
    gardu: "Gardu 19",
    hari: "Friday",
    tanggal: "2024-07-19",
    payment_methods: "Card",
    gol_1: 380,
    gol_2: 400,
    gol_3: 480,
    gol_4: 410,
    gol_5: 350,
    total: 2020,
  },
  {
    id: 20,
    ruas: "Route T",
    gerbang: "Gerbang 20",
    gardu: "Gardu 20",
    hari: "Saturday",
    tanggal: "2024-07-20",
    payment_methods: "Cash",
    gol_1: 400,
    gol_2: 420,
    gol_3: 500,
    gol_4: 430,
    gol_5: 370,
    total: 2120,
  },
];

const IconChevron = <IconChevronDown size={20} className="text-gray-500" />;

const handleFilterClick = () => {
  console.log("Filter Clicked");
};

const TrafficReport = () => {
  return (
    <Box display="flex" flexDirection="column" gap={7} mt={5}>
      {/* Box Filter */}
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
          options={ruasOptions}
          getOptionLabel={(option) => option.ruas_nama}
          fullWidth
          popupIcon={IconChevron}
          PaperComponent={PaperComponent}
          //   value={ruas}
          //   onChange={handleRuas}
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
          options={garduOptions}
          getOptionLabel={(option) => option.gardu_nama}
          fullWidth
          isOptionEqualToValue={(option, value) =>
            option.gardu_id === value.gardu_id
          }
          popupIcon={IconChevron}
          PaperComponent={PaperComponent}
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
        <DateRangePicker
          label="Date range (controlled)"
          //   value={value}
          //   onChange={setValue}
          className="max-w-xs"
        />
        <Box display="flex" gap={1}>
          <Button color="primary" onClick={handleFilterClick}>
            Filter
          </Button>
          <Button color="secondary">Reset</Button>
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

          {dummyData.length > 0 && (
            <DataGridTable
              rows={dummyData.map((item, idx) => ({ ...item, no: idx + 1 }))}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TrafficReport;
