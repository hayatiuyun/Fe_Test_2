import { AtpData } from "@/types/atp";
import { GerbangData } from "@/types/gerbang";
import { Traffic } from "@/types/traffics";
import { API } from "@/utils/api";
import { format } from "date-fns";

export const getATPData = async () => {
  try {
    // const res = await API.get("recruitment/at4");
    // const data = res.data;
    const data = [
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 56,
        ebni: 38,
        ebri: 132,
        edki: 0,
        eflo: 0,
        emandiri: 168,
        emega: 20,
        enobu: 0,
        golongan: 1,
        id: 23868,
        idasalgerbang: 4,
        idcabang: 37,
        idgardu: 6,
        idgerbang: 1,
        shift: 3,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 3,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 0,
        ebni: 1,
        ebri: 9,
        edki: 0,
        eflo: 0,
        emandiri: 3,
        emega: 10,
        enobu: 0,
        golongan: 2,
        id: 23869,
        idasalgerbang: 2,
        idcabang: 12,
        idgardu: 6,
        idgerbang: 1,
        shift: 3,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 0,
        ebni: 0,
        ebri: 0,
        edki: 40,
        eflo: 0,
        emandiri: 1,
        emega: 0,
        enobu: 0,
        golongan: 4,
        id: 23870,
        idasalgerbang: 2,
        idcabang: 1,
        idgardu: 6,
        idgerbang: 1,
        shift: 3,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 4,
        ebca: 9,
        ebni: 10,
        ebri: 37,
        edki: 0,
        eflo: 200,
        emandiri: 43,
        emega: 40,
        enobu: 0,
        golongan: 1,
        id: 23871,
        idasalgerbang: 0,
        idcabang: 87,
        idgardu: 7,
        idgerbang: 1,
        shift: 3,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 3,
        ebni: 5,
        ebri: 21,
        edki: 0,
        eflo: 0,
        emandiri: 14,
        emega: 0,
        enobu: 0,
        golongan: 2,
        id: 23872,
        idasalgerbang: 0,
        idcabang: 63,
        idgardu: 7,
        idgerbang: 1,
        shift: 3,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 1,
        ebni: 0,
        ebri: 15,
        edki: 10,
        eflo: 0,
        emandiri: 8,
        emega: 0,
        enobu: 0,
        golongan: 3,
        id: 23873,
        idasalgerbang: 0,
        idcabang: 63,
        idgardu: 7,
        idgerbang: 3,
        shift: 1,
        tanggal: "Sat, 01 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 0,
        ebca: 0,
        ebni: 1,
        ebri: 2,
        edki: 0,
        eflo: 0,
        emandiri: 6,
        emega: 0,
        enobu: 0,
        golongan: 5,
        id: 23874,
        idasalgerbang: 0,
        idcabang: 45,
        idgardu: 7,
        idgerbang: 1,
        shift: 1,
        tanggal: "Sat, 05 Jun 2024 00:00:00 GMT",
        tunai: 0,
      },
      {
        dinaskary: 0,
        dinasmitra: 0,
        dinasopr: 5,
        ebca: 17,
        ebni: 11,
        ebri: 82,
        edki: 0,
        eflo: 0,
        emandiri: 107,
        emega: 0,
        enobu: 52,
        golongan: 1,
        id: 23875,
        idasalgerbang: 4,
        idcabang: 18,
        idgardu: 8,
        idgerbang: 1,
        shift: 1,
        tanggal: "Sat, 03 Apr 2024 00:00:00 GMT",
        tunai: 7,
      },
    ];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGerbangData = async () => {
  // const res = await API.get("recruitment/gerbang");
  // const data = res.data;
  try {
    const data = [
      {
        ruas_nama: "Ruas Alpha",
        ruas_id: 87,
        gerbang_nama: "Gerbang Alpha",
        gerbang_id: 1,
        id: 1,
      },
      {
        ruas_nama: "Ruas Beta",
        ruas_id: 12,
        gerbang_nama: "Gerbang Beta",
        gerbang_id: 5,
        id: 2,
      },
      {
        ruas_nama: "Ruas Gamma",
        ruas_id: 45,
        gerbang_nama: "Gerbang Gamma",
        gerbang_id: 17,
        id: 3,
      },
      {
        ruas_nama: "Ruas Delta",
        ruas_id: 29,
        gerbang_nama: "Gerbang Delta",
        gerbang_id: 8,
        id: 4,
      },
      {
        ruas_nama: "Ruas Epsilon",
        ruas_id: 63,
        gerbang_nama: "Gerbang Epsilon",
        gerbang_id: 19,
        id: 5,
      },
      {
        ruas_nama: "Ruas Zeta",
        ruas_id: 18,
        gerbang_nama: "Gerbang Zeta",
        gerbang_id: 6,
        id: 6,
      },
      {
        ruas_nama: "Ruas Eta",
        ruas_id: 37,
        gerbang_nama: "Gerbang Eta",
        gerbang_id: 11,
        id: 7,
      },
      {
        ruas_nama: "Ruas Theta",
        ruas_id: 50,
        gerbang_nama: "Gerbang Theta",
        gerbang_id: 14,
        id: 8,
      },
      {
        ruas_nama: "Ruas Iota",
        ruas_id: 72,
        gerbang_nama: "Gerbang Iota",
        gerbang_id: 21,
        id: 9,
      },
      {
        ruas_nama: "Ruas Kappa",
        ruas_id: 25,
        gerbang_nama: "Gerbang Kappa",
        gerbang_id: 7,
        id: 10,
      },
      {
        ruas_nama: "Ruas Kappa",
        ruas_id: 25,
        gerbang_nama: "Gerbang Kappa",
        gerbang_id: 3,
        id: 10,
      },
    ];
    return data;
  } catch (error) {}
};

export const getTraffics = async () => {
  try {
    const dataAtp = await getATPData();
    const dataGerbang = await getGerbangData();

    if (!dataAtp || !dataGerbang) throw new Error("Data not found");

    const findGerbang = (id: number) => dataGerbang.find(item => item.gerbang_id === id)?.gerbang_nama || "";
    const findRuas = (id: number) => dataGerbang.find(item => item.ruas_id === id)?.ruas_nama || "";

    const paymentMethod = (method: string) => method === "NO-KTP" ? "E-TOLL + TUNAI + FLO" : method;

    const filterDataByPaymentMethod = (data: AtpData[], payment_method: string) => {
      const filterCondition = (item: AtpData) => {
        switch (payment_method) {
          case "KTP":
            return item.dinaskary !== 0 || item.dinasmitra !== 0 || item.dinasopr !== 0;
          case "FLO":
            return item.eflo !== 0;
          case "ETOLL":
            return item.ebca !== 0 || item.ebni !== 0 || item.ebri !== 0 || item.edki !== 0 || item.emandiri !== 0 || item.emega !== 0 || item.enobu !== 0;
          case "TUNAI":
            return item.tunai !== 0;
          case "NO-KTP":
            return item.dinaskary === 0 && item.dinasmitra === 0 && item.dinasopr === 0;
          default:
            return true;
        }
      };

      return data.filter(filterCondition).map(item => ({
        ...item,
        ruas: findRuas(item.idcabang),
        id: item.id,
        gerbang: findGerbang(item.idgerbang),
        gardu: item.idgardu,
        tanggal: format(new Date(item.tanggal), "dd/MM/yyyy"),
        hari: format(new Date(item.tanggal), "EEEE"),
        payment_method: paymentMethod(payment_method),
      }));
    };

    const sumGolongan = (golongan: number, data: AtpData[], payment_method: string) =>
      data
        .filter(item => item.golongan === golongan)
        .reduce((acc, item) => {
          switch (payment_method) {
            case "KTP":
              return acc + item.dinaskary + item.dinasmitra + item.dinasopr;
            case "FLO":
              return acc + item.eflo;
            case "ETOLL":
              return acc + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu;
            case "TUNAI":
              return acc + item.tunai;
            case "ALL":
              return acc + item.dinaskary + item.dinasmitra + item.dinasopr + item.eflo + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu + item.tunai;
            case "NO-KTP":
              return acc + item.eflo + item.ebca + item.ebni + item.ebri + item.edki + item.emandiri + item.emega + item.enobu + item.tunai;
            default:
              return acc;
          }
        }, 0);

    const getDataPayment = (data: AtpData[], payment_method: string) => {
      const filteredData = filterDataByPaymentMethod(data, payment_method);

      return filteredData.map((item, index) => ({
        gol_1: sumGolongan(1, filteredData, payment_method),
        gol_2: sumGolongan(2, filteredData, payment_method),
        gol_3: sumGolongan(3, filteredData, payment_method),
        gol_4: sumGolongan(4, filteredData, payment_method),
        gol_5: sumGolongan(5, filteredData, payment_method),
        ...item,
        no: index + 1,
        total: [1, 2, 3, 4, 5].reduce((acc, golongan) => acc + sumGolongan(golongan, filteredData, payment_method), 0),
      }));
    };

    const createGroupedDataMap = (data: AtpData[]) => [
      { payment_method: "KTP", data: getDataPayment(data, "KTP") },
      { payment_method: "FLO", data: getDataPayment(data, "FLO") },
      { payment_method: "ETOLL", data: getDataPayment(data, "ETOLL") },
      { payment_method: "TUNAI", data: getDataPayment(data, "TUNAI") },
      { payment_method: "ALL", data: getDataPayment(data, "ALL") },
      { payment_method: "E-TOLL + TUNAI + FLO", data: getDataPayment(data, "NO-KTP") },
    ];

    const result = createGroupedDataMap(dataAtp);
    console.log(result);

    const gerbang = result.flatMap(item => item.data).map(item => ({
      gerbang_nama: item.gerbang,
      gerbang_id: item.idgerbang,
      ruas_nama: item.ruas,
      ruas_id: item.idcabang,
      id: item.id,
      gardu: item.gardu,
    }));

    return {
      data: result,
      gerbang,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      gerbang: [],
    };
  }
};

interface dataGateStream {
  ruas_id: number;
  gerbang_nama: string;
  gerbang_id: number;
  ruas_nama: string;
  no?: number;
}

export const postDataGate = async (data: dataGateStream) => {
  try {
    const res = await API.post("recruitment/gerbang", data);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const putDataGate = async (data: dataGateStream) => {
  try {
    const res = await API.put(`recruitment/gerbang`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deleteDataGate = async (data: {
  ruas_id: number;
  gerbang_id: number;
}) => {
  try {
    const res = await API.delete(`recruitment/gerbang`, { data });
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
