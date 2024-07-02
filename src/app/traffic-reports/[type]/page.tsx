import RootLayout from '@/components/Layout'
import TrafficReport from '@/components/TrafficReport'
import { getTraffics } from '@/lib/data'
import React from 'react'
// get params of page
const TrafficPage = async (
    { params }
    : { params: { type: string } }
) => {
  const dataTraffics = await getTraffics();
  const {data, gerbang} = dataTraffics;
  return (
    <RootLayout title={`Traffic Reports / ${params.type}`}>
        <TrafficReport data={data} gerbang={gerbang} />
    </RootLayout>
  )
}

export default TrafficPage