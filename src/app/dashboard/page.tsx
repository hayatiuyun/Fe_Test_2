import DashboardUI from "@/components/Dashboard";
import Layout from "@/components/Layout";
import { getATPData, getGerbangData } from "@/lib/data";
import { formatDate } from "date-fns";

export default async function Protected({
  searchParams,
}: {
  searchParams: {
    date: string;
  };
}) {
  const date = searchParams?.date || formatDate(new Date(), "yyyy-MM-dd");

  const data = await getATPData({ date: formatDate(new Date(), "yyyy-MM-dd") });
  const dataGerbang = await getGerbangData();
  return (
    <Layout title="Dashboard">
      <DashboardUI data={data} dataGerbang={dataGerbang} />
    </Layout>
  );
}
