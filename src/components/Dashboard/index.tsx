"use client";

import React from "react";
import BarChart from "../Chart/Bar";
import PieChart from "../Chart/Pie";
import Filters from "./Filters";
import { useSeriesColumn } from "@/hooks/useSeriesColumn";

const dummyOptions = [
  {
    ruas_id: 35,
    ruas_nama: "Example 1",
    gerbang_id: 1,
    gerbang_nama: "Example Gerbang v1",
    db: "random",
  },
  {
    ruas_id: 35,
    ruas_nama: "Example 2",
    gerbang_id: 1,
    gerbang_nama: "Example Gerbang v2",
    db: "random",
  },
  {
    ruas_id: 35,
    ruas_nama: "Example 3",
    gerbang_id: 1,
    gerbang_nama: "Example Gerbang v3",
    db: "random",
  },
  {
    ruas_id: 35,
    ruas_nama: "Example 4",
    gerbang_id: 1,
    gerbang_nama: "Example Gerbang v4",
    db: "random",
  },
  {
    ruas_id: 35,
    ruas_nama: "Example 5",
    gerbang_id: 1,
    gerbang_nama: "Example Gerbang v5",
    db: "random",
  },
  {
    ruas_id: 36,
    ruas_nama: "Example 6",
    gerbang_id: 2,
    gerbang_nama: "Example Gerbang v6",
    db: "random",
  },
  {
    ruas_id: 36,
    ruas_nama: "Example 7",
    gerbang_id: 2,
    gerbang_nama: "Example Gerbang v7",
    db: "random",
  },
  {
    ruas_id: 37,
    ruas_nama: "Example 8",
    gerbang_id: 3,
    gerbang_nama: "Example Gerbang v8",
    db: "random",
  },
  {
    ruas_id: 37,
    ruas_nama: "Example 9",
    gerbang_id: 3,
    gerbang_nama: "Example Gerbang v9",
    db: "random",
  },
  {
    ruas_id: 38,
    ruas_nama: "Example 10",
    gerbang_id: 4,
    gerbang_nama: "Example Gerbang v10",
    db: "random",
  },
];

type DashboardUIProps = {
  data: [] | any;
};

const DashboardUI = ({ data }: DashboardUIProps) => {
  const { seriesColumn, handleFilter, seriesPie, handleReset } = useSeriesColumn({ data });
  // const seriesPie = useSeriesPie(data);

  const onFilter = ({ ruas, gerbang, date }: any) => {
    handleFilter({
      idGate: gerbang,
      idRoutes: ruas,
      date,
    });
  };

  return (
    <div className="flex flex-col gap-12 pt-5">
      <Filters options={dummyOptions} handleFilter={onFilter} handleReset={handleReset} />
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        <div className="w-full lg:w-[49%] text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Traffic Counts</h2>
          <div className="p-4 rounded-lg border-1.5">
            <div className="h-96">
              <BarChart
                data={seriesColumn}
                yTitle="Total Counts"
                xTitle="Payment Method"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[49%] text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Total Traffics</h2>
          <div className="p-4 rounded-lg border-1.5">
            <div className="h-96">
              <PieChart data={seriesPie} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;
