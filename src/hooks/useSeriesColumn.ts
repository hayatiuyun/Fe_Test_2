import { format } from "date-fns/format";
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

export const useSeriesColumn = ({ data }: { data: any[] }) => {
  const [seriesColumn, setSeriesColumn] = useState<Series[]>([]);
  const [seriesPie, setSeriesPie] = useState<Series[]>([]);

  console.log(seriesColumn, 'seriesColumn', seriesPie, 'seriesPie');
  

  const handleFilter = ({ idGate, idRoutes, date }: FilterParams) => {
    if (!data) return;

    const filteredData = data.filter(item => {
      const isIdGateMatch = !idGate || item.idgerbang === idGate;
      const isIdRoutesMatch = !idRoutes || item.idcabang === idRoutes;
      // filter tanggal is equal with date: new Date(), tanggal: 'Sat, 01 Jun 2024 00:00:00 GMT'. compare date and tanggal string
      const isDateInRange = !date || format(new Date(item.tanggal), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      return isIdGateMatch && isIdRoutesMatch && isDateInRange;
    });

    console.log(filteredData, 'filteredData', idGate, idRoutes);
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

  const setDefaultSeries = () => {
    setSeriesColumn(parsedDataColumn(data));
    setSeriesPie(parsedDataPie(data));
  }
  useEffect(() => {
    if (data) {
      setDefaultSeries()
    }
  }, [data]);


  return {
    seriesColumn,
    seriesPie,
    handleFilter,
    handleReset: setDefaultSeries,
  };
};
