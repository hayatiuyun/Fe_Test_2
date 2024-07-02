"use client";

import React from "react";
import BarChart from "../Chart/Bar";
import PieChart from "../Chart/Pie";
import Filters from "./Filters";
import { useSeriesColumn } from "@/hooks/useSeriesColumn";
import { GerbangData } from "@/types/gerbang";

type DashboardUIProps = {
  data: [] | any;
  options: GerbangData[] | any;
};

const DashboardUI = ({ data, options }: DashboardUIProps) => {
  const { seriesColumn, handleFilter, seriesPie, handleReset } =
    useSeriesColumn({ data });
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
      <Filters
        options={options}
        handleFilter={onFilter}
        handleReset={handleReset}
      />
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
