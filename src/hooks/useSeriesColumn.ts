import { getATPData } from "@/lib/data";
import { GerbangData } from "@/types/gerbang";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Series = {
  name: string;
  y: number;
};

interface FilterParams {
  idGate?: string;
  idRoutes?: string;
  date?: Date;
}

// Parsing data for column chart
const parsedDataColumn = (data: any[]): Series[] => {
  const keysWithLabel = [
    { name: "eBca", label: "BCA" },
    { name: "eBri", label: "BRI" },
    { name: "eBni", label: "BNI" },
    { name: "eDKI", label: "DKI" },
    { name: "eMandiri", label: "MANDIRI" },
    { name: "eMega", label: "Mega" },
    { name: "eFlo", label: "Flo" },
  ];

  return keysWithLabel.map((key) => ({
    name: key.label,
    y: data.reduce((acc, obj) => acc + (obj[key.name] || 0), 0),
  }));
};

// Parsing data for pie chart
const parsedDataPie = (data: any[]): Series[] => {
  const shiftData = ["Shift 1", "Shift 2", "Shift 3"];
  return shiftData.map((shift, index) => ({
    name: shift,
    y: data.filter((obj) => obj.Shift === index + 1).length,
  }));
};

// Parsing data for Ruas chart
const parsedDataRuas = (data: any[], dataGerbang: GerbangData[]): Series[] => {
  if (!data || !dataGerbang.length) return [];

  const labelGerbangData = [
    ...new Map(dataGerbang.map((item) => [item["NamaCabang"], item])).values(),
  ];

  return labelGerbangData.map((gerbang: any) => ({
    name: gerbang.NamaCabang,
    y: data.filter((obj) => obj.IdCabang === gerbang.IdCabang).length,
  }));
};

// Parsing data for Gerbang chart
const parsedDataGerbang = (
  data: any[],
  dataGerbang: GerbangData[]
): Series[] => {
  if (!dataGerbang.length) return [];

  return dataGerbang.map((gerbang: GerbangData, index: number) => ({
    name: gerbang.NamaGerbang,
    y: data.filter((obj) => obj.IdGerbang === index + 1).length,
  }));
};

// Custom hook to handle series data for charts
export const useSeriesColumn = ({
  data,
  dataGerbang,
}: {
  data: any[];
  dataGerbang: GerbangData[];
}) => {
  const [seriesColumn, setSeriesColumn] = useState<Series[]>([]);
  const [seriesGerbang, setSeriesGerbang] = useState<Series[]>([]);
  const [seriesPie, setSeriesPie] = useState<Series[]>([]);
  const [seriesRuas, setSeriesRuas] = useState<Series[]>([]);

  const handleFilter = async ({ date }: FilterParams) => {
    if (!date) return;

    const {data: responseData} = await getATPData({ date: format(date, "yyyy-MM-dd") });
    if (!responseData.length) {
      setSeriesColumn([]);
      setSeriesPie([]);
      setSeriesGerbang([]);
      setSeriesRuas([]);
      return;
    }

    setSeriesColumn(parsedDataColumn(responseData));
    setSeriesPie(parsedDataPie(responseData));
    setSeriesGerbang(parsedDataGerbang(responseData, dataGerbang));
    setSeriesRuas(parsedDataRuas(responseData, dataGerbang));
  };

  const setDefaultSeries = () => {
    setSeriesColumn(parsedDataColumn(data));
    setSeriesPie(parsedDataPie(data));
    setSeriesGerbang(parsedDataGerbang(data, dataGerbang));
    setSeriesRuas(parsedDataRuas(data, dataGerbang));
  };

  useEffect(() => {
    if (data) {
      setDefaultSeries();
    }
  }, [data]);

  return {
    seriesColumn,
    seriesPie,
    handleFilter,
    handleReset: setDefaultSeries,
    seriesGerbang,
    seriesRuas,
  };
};
