// hooks to filtering and updating data traffic reports

import { format } from "date-fns/format";
import { useEffect, useState } from "react";

interface FilterParams {
  idGate?: string;
  idRoutes?: string;
  dates?: { start?: Date | undefined | null; end?: Date | undefined | null };
  idGardu?: string;
}

export default function useTrafficReports(data: any[]) {
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleFilter = ({ idGate, idRoutes, idGardu, dates }: FilterParams) => {
    const { start, end } = dates as any;
    let filtered = data;
    if (idGate) {
      filtered = filtered.filter((item) => item.gerbang_id === idGate);
    }
    if (idRoutes) {
      filtered = filtered.filter((item) => item.ruas_id === idRoutes);
    }
    if (idGardu) {
      filtered = filtered.filter((item) => item.gardu_id === idGardu);
    }
    if (start && end) {
      filtered = filtered.filter((item) => {
        const dateItem = new Date(item.date);
        return dateItem >= start && dateItem <= end;
      });
    }
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilteredData(data);
  }

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);



  return {
    data: filteredData,
    handleFilter,
    handleReset,
  };
}
