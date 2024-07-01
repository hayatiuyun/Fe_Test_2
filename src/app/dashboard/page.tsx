import DashboardUI from "@/components/Dashboard";
import Layout from "@/components/Layout";

async function getATPData() {

  try {
    // const res = await API.get("recruitment/at4");
    // const data = res.data;
    const data = [
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 56,
          "ebni": 38,
          "ebri": 132,
          "edki": 0,
          "eflo": 0,
          "emandiri": 168,
          "emega": 20,
          "enobu": 0,
          "golongan": 1,
          "id": 23868,
          "idasalgerbang": 4,
          "idcabang": 35,
          "idgardu": 6,
          "idgerbang": 1,
          "shift": 3,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 3
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 0,
          "ebni": 1,
          "ebri": 9,
          "edki": 0,
          "eflo": 0,
          "emandiri": 3,
          "emega": 10,
          "enobu": 0,
          "golongan": 2,
          "id": 23869,
          "idasalgerbang": 2,
          "idcabang": 35,
          "idgardu": 6,
          "idgerbang": 1,
          "shift": 3,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 0,
          "ebni": 0,
          "ebri": 0,
          "edki": 40,
          "eflo": 0,
          "emandiri": 1,
          "emega": 0,
          "enobu": 0,
          "golongan": 4,
          "id": 23870,
          "idasalgerbang": 2,
          "idcabang": 35,
          "idgardu": 6,
          "idgerbang": 1,
          "shift": 3,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 4,
          "ebca": 9,
          "ebni": 10,
          "ebri": 37,
          "edki": 0,
          "eflo": 200,
          "emandiri": 43,
          "emega": 40,
          "enobu": 0,
          "golongan": 1,
          "id": 23871,
          "idasalgerbang": 0,
          "idcabang": 35,
          "idgardu": 7,
          "idgerbang": 1,
          "shift": 3,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 3,
          "ebni": 5,
          "ebri": 21,
          "edki": 0,
          "eflo": 0,
          "emandiri": 14,
          "emega": 0,
          "enobu": 0,
          "golongan": 2,
          "id": 23872,
          "idasalgerbang": 0,
          "idcabang": 35,
          "idgardu": 7,
          "idgerbang": 1,
          "shift": 3,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 1,
          "ebni": 0,
          "ebri": 15,
          "edki": 10,
          "eflo": 0,
          "emandiri": 8,
          "emega": 0,
          "enobu": 0,
          "golongan": 3,
          "id": 23873,
          "idasalgerbang": 0,
          "idcabang": 37,
          "idgardu": 7,
          "idgerbang": 3,
          "shift": 1,
          "tanggal": "Sat, 01 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 0,
          "ebca": 0,
          "ebni": 1,
          "ebri": 2,
          "edki": 0,
          "eflo": 0,
          "emandiri": 6,
          "emega": 0,
          "enobu": 0,
          "golongan": 5,
          "id": 23874,
          "idasalgerbang": 0,
          "idcabang": 5,
          "idgardu": 7,
          "idgerbang": 1,
          "shift": 1,
          "tanggal": "Sat, 05 Jun 2024 00:00:00 GMT",
          "tunai": 0
      },
      {
          "dinaskary": 0,
          "dinasmitra": 0,
          "dinasopr": 5,
          "ebca": 17,
          "ebni": 11,
          "ebri": 82,
          "edki": 0,
          "eflo": 0,
          "emandiri": 107,
          "emega": 0,
          "enobu": 52,
          "golongan": 1,
          "id": 23875,
          "idasalgerbang": 4,
          "idcabang": 35,
          "idgardu": 8,
          "idgerbang": 1,
          "shift": 1,
          "tanggal": "Sat, 03 Apr 2024 00:00:00 GMT",
          "tunai": 7
      },
  ] 
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Protected() {
  const data = await getATPData();
  return (
    <Layout title="Dashboard">
      <DashboardUI data={data} />
    </Layout>
  );
}
