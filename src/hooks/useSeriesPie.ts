// hooks to parse data for series pie without updating dependency
import { useEffect, useState } from "react";
type series = {
  name: string;
  y: number;
};

export const useSeriesPie = (data: any[]) => {
  const [seriesPie, setSeriesPie] = useState<series[]>([]);
  useEffect(() => {
    setSeriesPie(
      Object.values(
        data.reduce((acc: any, item: any) => {
          const shift = `Shift ${item.shift}`;
          acc[shift] = (acc[shift] || 0) + item.tunai;
          return acc;
        }, {})
      ).map((value, index) => ({
        name: `Shift ${index + 1}`,
        y: value as number,
      }))
    );
  }, [data]);
  return seriesPie;
};
