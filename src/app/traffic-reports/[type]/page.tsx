import RootLayout from '@/components/Layout'
import TrafficReport from '@/components/TrafficReport'
import React from 'react'
// get params of page
const page = (
    { params }
    : { params: { type: string } }
) => {

  return (
    <RootLayout title={`Traffic Reports / ${params.type}`}>
        <TrafficReport />
    </RootLayout>
  )
}

export default page