import RootLayout from "@/components/Layout";
import TrafficReport from "@/components/TrafficReport";
import { getATPData, getTraffics } from "@/lib/data";
import { formatDate } from "date-fns";
import React from "react";
// get params of page
const TrafficPage = async ({
  params,
  searchParams
}: {
  params: { type: string,
   
  };
  searchParams: { date: string, page: number, limit: number, query: string };

}) => {
  console.log("", params);
  
  const date = searchParams?.date || formatDate(new Date(), "yyyy-MM-dd");
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const query = searchParams?.query || '';
  
  const dataTraffics = await getTraffics({
    date,
    page,
    limit,
    query,
  });
  const { data, gerbang, currentPage, totalPage, count } = dataTraffics;
  return (
    <RootLayout title={`Traffic Reports / ${params.type}`}>
      <TrafficReport
        data={data}
        gerbang={gerbang}
        currentPage={currentPage}
        totalPage={totalPage}
        count={count}
      />
    </RootLayout>
  );
};

export default TrafficPage;
