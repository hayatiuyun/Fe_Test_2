// hooks to filtering and updating data traffic reports
import { useEffect, useState } from "react";

interface FilterParams {
  idcabang?: string | number;
  idgerbang?: string | number;
  gardu?: string | number;
  startDate?: Date;
  endDate?: Date;
}

type FilterConditions = Partial<FilterParams>;



export default function useTrafficReports(data: any[]) {
  console.log("Original Data", data);
  
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleFilter = (filters: FilterParams) => {
    console.log("filters", filters);

    // const { start, end } = dates as any;
    if (!data) return;
    if (!filters) {
      return data; // If filters are undefined or null, return the original data
    }

    const filtered = data.map((item) => ({
      ...item,
      data: item.data.filter((itemx: any) => {
        // Check id and gender filters
        for (let key in filters) {
          if (key === 'startDate' || key === 'endDate') {
            continue; // Skip date range filters for now
          }
          const value = filters[key as keyof FilterConditions];
          if (value !== undefined && itemx[key as keyof FilterParams] !== value) {
            return false;
          }
        }
    
        // Check dateOfBirth range filter
        if (filters.startDate && new Date(itemx.tanggal) < filters.startDate) {
          return false;
        }
        if (filters.endDate && new Date(itemx.tanggal) > filters.endDate) {
          return false;
        }
    
        return true;
      }),
    }));
    console.log("filtered", filtered);
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilteredData(data);
  };

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
