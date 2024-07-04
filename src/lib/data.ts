'use server';
import { AtpData } from "@/types/atp";
import { GerbangData } from "@/types/gerbang";
import { Traffic } from "@/types/traffics";
import API from "@/utils/api";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const getATPData = async ({limit, page, date}: {limit?: number | undefined | null, page?: number | undefined | null, date: string}) => {
 console.log(`lalins?date=${date}&limit=${limit ? `${limit}&page=${page}` : `325}`}`);
 
  try {
    const res = await API.get(`lalins?tanggal=${date}&limit=${limit ? `${limit}&page=${page}` : `325`}`);
    const data = res.data;
    
    return data.data.rows.rows;
  } catch (error) {
    console.error(error);
    return [];
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

export const getTraffics = async () => {
  try {
    // const dataAtp = await getATPData();
    const dataGerbang = await getGerbangData();

    // if (!dataAtp || !dataGerbang) throw new Error("Data not found");

    // const findGerbang = (id: number) => dataGerbang.find(item => item.gerbang_id === id)?.NamaGerbang || "";
    // const findRuas = (id: number) => dataGerbang.find(item => item.ruas_id === id)?.NamaCabang || "";

    // const paymentMethod = (method: string) => method === "NO-KTP" ? "E-TOLL + TUNAI + FLO" : method;

    // const filterDataByPaymentMethod = (data: AtpData[], payment_method: string) => {
    //   const filterCondition = (item: AtpData) => {
    //     switch (payment_method) {
    //       case "KTP":
    //         return item.dinaskary !== 0 || item.dinasmitra !== 0 || item.dinasopr !== 0;
    //       case "FLO":
    //         return item.eflo !== 0;
    //       case "ETOLL":
    //         return item.ebca !== 0 || item.ebni !== 0 || item.ebri !== 0 || item.edki !== 0 || item.emandiri !== 0 || item.emega !== 0 || item.enobu !== 0;
    //       case "TUNAI":
    //         return item.tunai !== 0;
    //       case "NO-KTP":
    //         return item.dinaskary === 0 && item.dinasmitra === 0 && item.dinasopr === 0;
    //       default:
    //         return true;
    //     }
    //   };

    //   return data.filter(filterCondition).map(item => ({
    //     ...item,
    //     ruas: findRuas(item.idcabang),
    //     id: item.id,
    //     gerbang: findGerbang(item.idgerbang),
    //     gardu: item.idgardu,
    //     tanggal: format(new Date(item.tanggal), "dd/MM/yyyy"),
    //     hari: format(new Date(item.tanggal), "EEEE"),
    //     payment_method: paymentMethod(payment_method),
    //   }));
    // };

    // const sumGolongan = (golongan: number, data: AtpData[], payment_method: string) =>
    //   data
    //     .filter(item => item.golongan === golongan)
    //     .reduce((acc, item) => {
    //       switch (payment_method) {
    //         case "KTP":
    //           return acc + item.dinaskary + item.dinasmitra + item.dinasopr;
    //         case "FLO":
    //           return acc + item.eflo;
    //         case "ETOLL":
    //           return acc + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu;
    //         case "TUNAI":
    //           return acc + item.tunai;
    //         case "ALL":
    //           return acc + item.dinaskary + item.dinasmitra + item.dinasopr + item.eflo + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu + item.tunai;
    //         case "NO-KTP":
    //           return acc + item.eflo + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu + item.tunai;
    //         default:
    //           return acc;
    //       }
    //     }, 0);

    // const getDataPayment = (data: AtpData[], payment_method: string) => {
    //   const filteredData = filterDataByPaymentMethod(data, payment_method);

    //   return filteredData.map((item, index) => ({
    //     gol_1: sumGolongan(1, filteredData, payment_method),
    //     gol_2: sumGolongan(2, filteredData, payment_method),
    //     gol_3: sumGolongan(3, filteredData, payment_method),
    //     gol_4: sumGolongan(4, filteredData, payment_method),
    //     gol_5: sumGolongan(5, filteredData, payment_method),
    //     ...item,
    //     no: index + 1,
    //     total: [1, 2, 3, 4, 5].reduce((acc, golongan) => acc + sumGolongan(golongan, filteredData, payment_method), 0),
    //   }));
    // };

    // const createGroupedDataMap = (data: AtpData[]) => [
    //   { payment_method: "KTP", data: getDataPayment(data, "KTP") },
    //   { payment_method: "FLO", data: getDataPayment(data, "FLO") },
    //   { payment_method: "ETOLL", data: getDataPayment(data, "ETOLL") },
    //   { payment_method: "TUNAI", data: getDataPayment(data, "TUNAI") },
    //   { payment_method: "ALL", data: getDataPayment(data, "ALL") },
    //   { payment_method: "E-TOLL + TUNAI + FLO", data: getDataPayment(data, "NO-KTP") },
    // ];

    // const result = createGroupedDataMap(dataAtp);
    // console.log(result);

    // const gerbang = result.flatMap(item => item.data).map(item => ({
    //   NamaGerbang: item.gerbang,
    //   gerbang_id: item.idgerbang,
    //   NamaCabang: item.ruas,
    //   ruas_id: item.idcabang,
    //   id: item.id,
    //   gardu: item.gardu,
    // }));

    // return {
    //   data: result,
    //   gerbang,
    // };
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

    const dataAtp = await API.get(`lalins${limit ? `?limit=${limit}` : ""}`)
    const dataGerbang = await getGerbangData();

    
    if (!dataAtp || !dataGerbang) throw new Error("Data not found");
    const findGerbang = (id: number) => dataGerbang.find((item: GerbangData) => item.id === id)?.NamaGerbang || "";
    
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
    revalidatePath('/master-gates')
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
