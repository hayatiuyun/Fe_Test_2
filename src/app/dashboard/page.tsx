import DashboardUI from "@/components/Dashboard";
import Layout from "@/components/Layout";
import { getATPData, getGerbangData } from "@/lib/data";

export default async function Protected() {
  const data = await getATPData();
  const dataGerbang = await getGerbangData();
  return (
    <Layout title="Dashboard">
      <DashboardUI data={data} options={dataGerbang} />
    </Layout>
  );
}
