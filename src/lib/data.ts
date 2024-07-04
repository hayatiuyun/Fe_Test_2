"use server";
import { AtpData } from "@/types/atp";
import { GerbangData } from "@/types/gerbang";
import { Traffic } from "@/types/traffics";
import API from "@/utils/api";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const getATPData = async ({
  limit,
  page,
  date,
}: {
  limit?: number | undefined | null;
  page?: number | undefined | null;
  date: string;
}) => {
  console.log(
    `lalins?date=${date}&limit=${limit ? `${limit}&page=${page}` : `325}`}`
  );

  try {
    const res = await API.get(
      `lalins?tanggal=${date}&limit=${limit ? `${limit}&page=${page}` : `325`}`
    );
    const data = res.data;

    return {
      data: data.data.rows.rows,
      totalPages: data.data.total_pages,
      count: data.data.count,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      totalPages: 0,
      count: 0,
    };
  }
};

export const getGerbangData = async () => {
  try {
    const res = await API.get("/gerbangs");
    const data = res.data;
    return data.data.rows.rows;
  } catch (error) {
    console.log(error);

    return [];
  }
};

interface TrafficData {
  payment_method: string;
  data: Traffic[];
}

export const getTraffics = async ({
  date,
  page,
  limit,
  query,
}: {
  date: string;
  page: number;
  limit: number;
  query: string;
}) => {
  try {
    const dataAtp = await getATPData({ date, page, limit });
    const dataGerbang = await getGerbangData();
    if (!dataAtp || !dataGerbang) throw new Error("Data not found");
    const Tunai = ["Tunai"];
    const E_Toll = [
      "eMandiri",
      "eBri",
      "eBni",
      "eBca",
      "eNobu",
      "eDKI",
      "eMega",
    ];
    const E_Flo = ["eFlo"];
    const KTP = ["DinasOpr", "DinasMitra", "DinasKary"];

    const paymentCategories: Record<string, string[]> = {
      Tunai: Tunai,
      "E-Toll": E_Toll,
      "E-Flo": E_Flo,
      KTP,
      Keseluruhan: ["Tunai", ...E_Toll, ...E_Flo, ...KTP],
      "E-Toll+E-Flo+Tunai": ["Tunai", ...E_Toll, ...E_Flo],
    };

    let dataLalins = dataAtp.data;

    // search dataLalins by query name gerbang or name cabang, and datalalins.idcabang = datagerbang.idcabang or datalalins.idgerbang = datagerbang.idgerbang
    if (query) {
      dataLalins = dataAtp.data.filter((l: any) => {
        const gerbang = dataGerbang.find(
          (g: any) => g.IdCabang === l.IdCabang && g.id === l.IdGerbang
        );
        return (
          gerbang &&
          (gerbang.NamaCabang.toLowerCase().includes(query.toLowerCase()) ||
            gerbang.NamaGerbang.toLowerCase().includes(query.toLowerCase()))
        );
      });
    }

    const convertedData: TrafficData[] = Object.keys(paymentCategories).map(
      (category) => {
        const methods = paymentCategories[category];
        const filteredData = dataLalins.filter((item: any) =>
          methods.some((method) => item[method] !== 0)
        );
        return {
          payment_method: category,
          data: filteredData.map((item: any, index: number) => {
            const newItem = { ...item };
            newItem.no = index + 1;
            newItem.payment_method = category;
            const gerbang = dataGerbang.find(
              (gerbang: any) => gerbang.id === item.IdGerbang
            );
            newItem.gerbang = gerbang?.NamaGerbang || "";
            newItem.ruas =
              dataGerbang.find(
                (gerbang: any) => gerbang.IdCabang === item.IdCabang
              )?.NamaCabang || "";
            return newItem;
          }),
        };
      }
    );

    console.log(convertedData);

    return {
      data: convertedData,
      gerbang: dataGerbang,
      totalPage: dataAtp.totalPages,
      count: dataAtp.count,
      currentPage: page,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      gerbang: [],
    };
  }
};

export const getLalin = async (limit: number, page: number) => {
  try {
    const dataAtp = await API.get(`lalins${limit ? `?limit=${limit}` : ""}`);
    const dataGerbang = await getGerbangData();

    if (!dataAtp || !dataGerbang) throw new Error("Data not found");
    const findGerbang = (id: number) =>
      dataGerbang.find((item: GerbangData) => item.id === id)?.NamaGerbang ||
      "";
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface dataGateStream {
  id: number;
  NamaGerbang: string;
  IdCabang: number;
  NamaCabang: string;
  no?: number;
}

export const postDataGate = async (data: dataGateStream) => {
  try {
    const res = await API.post(`/gerbangs`, data);
    revalidatePath("/master-gates");
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const putDataGate = async (data: dataGateStream) => {
  try {
    const res = await API.put(`/gerbangs`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deleteDataGate = async (data: {
  IdCabang: number;
  id: number;
}) => {
  try {
    const res = await API.delete(`/gerbangs`, { data });
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
