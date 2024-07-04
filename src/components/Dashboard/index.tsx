"use client";

import React from "react";
import BarChart from "../Chart/Bar";
import PieChart from "../Chart/Pie";
import Filters from "./Filters";
import { useSeriesColumn } from "@/hooks/useSeriesColumn";
import { GerbangData } from "@/types/gerbang";

type DashboardUIProps = {
  data: [] | any;
  dataGerbang: GerbangData[] | any;
};

const DashboardUI = ({ data, dataGerbang }: DashboardUIProps) => {
  const { seriesColumn, handleFilter, seriesPie, handleReset, seriesGerbang, seriesRuas} =
    useSeriesColumn({ data, dataGerbang });
  // const seriesPie = useSeriesPie(data);

  const onFilter = ({ date }: any) => {
    handleFilter({
      date,
    });
  };

  

  return (
    <div className="flex flex-col gap-12 pt-5">
      <Filters
        handleFilter={onFilter}
        handleReset={handleReset}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Total Traffic (Payment)</h2>
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
        <div className="text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Traffic Total (Shift)</h2>
          <div className="p-4 rounded-lg border-1.5">
            <div className="h-96">
              <PieChart data={seriesPie} />
            </div>
          </div>
        </div>
        <div className="text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Total Traffic (Gates)</h2>
          <div className="p-4 rounded-lg border-1.5">
            <div className="h-96">
              <BarChart
                data={seriesGerbang}
                yTitle="Total Counts"
                xTitle="Gerbang"
              />
            </div>
          </div>
        </div>
        <div className="text-center gap-4 flex flex-col">
          {/* Bar Chart */}
          <h2 className="text-lg font-semibold">Traffic Total (Ruas)</h2>
          <div className="p-4 rounded-lg border-1.5">
            <div className="h-96">
              <PieChart data={seriesRuas} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;
