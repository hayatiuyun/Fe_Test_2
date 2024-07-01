import { isWithinInterval, parse } from "date-fns";
import { useEffect, useState } from "react";

type Series = {
  name: string;
  y: number;
};

interface FilterParams {
  idGate?: string;
  idRoutes?: string;
  dates?: { start: string; end: string };
}

const parsedDataColumn = (data: any[]): Series[] => {
//   add label to keys
  const keysWithLabel = [
    {
        name: "ebca",
        label: "BCA",
        },
        {
        name: "ebni",
        label: "BNI",
        },
        {
        name: "ebri",
        label: "BRI",
        },
        {
        name: "edki",
        label: "DKI",
        },
        {
        name: "emandiri",
        label: "MANDIRI",
        },
        {
        name: "enobu",
        label: "NOBU",
        },
        {
        name: "eflo",
        label: "FLO",
        },
        {
        name: "emega",
        label: "MEGA",
        },
        {
        name: "tunai",
        label: "KTP",
    }
  ]

  return keysWithLabel.map(key => ({
    name: key.label,
    y: data.reduce((acc, obj) => acc + obj[key.name], 0),
  }));
};

const parsedDataPie = (data: any[]): Series[] => {
    const shiftData = ["Shift 1", "Shift 2", "Shift 3"];
    return shiftData.map((shift, index) => ({
      name: shift,
    //   sum of (data shift === index+1)
        y: data.filter(obj => obj.shift === index + 1).length,
    }));
    };

const parseDate = (date: string): Date =>
  parse(date, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());

export const useSeriesColumn = ({ data }: { data: any[] }) => {
  const [seriesColumn, setSeriesColumn] = useState<Series[]>([]);
  const [seriesPie, setSeriesPie] = useState<Series[]>([]);

  useEffect(() => {
    if (data) {
      setSeriesColumn(parsedDataColumn(data));
        setSeriesPie(parsedDataPie(data));
    }
  }, [data]);

  console.log(seriesColumn, 'seriesColumn', seriesPie, 'seriesPie');
  

  const handleFilter = ({ idGate, idRoutes, dates }: FilterParams) => {
    if (!data) return;

    const filteredData = data.filter(item => {
      const isIdGateMatch = !idGate || item.idgerbang === idGate;
      const isIdRoutesMatch = !idRoutes || item.idcabang === idRoutes;
      const isDateInRange = !dates || isWithinInterval(parseDate(item.tanggal), dates);

      return isIdGateMatch && isIdRoutesMatch && isDateInRange;
    });

    console.log(filteredData, 'filteredData', idGate, idRoutes, dates);
    if (!filteredData.length) {
        setSeriesColumn([]);
        setSeriesPie([]);
        return;
    }

    const parsedFilterColumn = parsedDataColumn(filteredData);
    const parsedFilterPie = parsedDataPie(filteredData);

    setSeriesColumn(parsedFilterColumn);
    setSeriesPie(parsedFilterPie);
    
  };

  return {
    seriesColumn,
    seriesPie,
    handleFilter,
  };
};
