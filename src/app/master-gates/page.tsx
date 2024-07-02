import RootLayout from '@/components/Layout'
import MasterGates from '@/components/MasterGates'
import { getGerbangData } from '@/lib/data'
import React from 'react'

const MasterGatesPage = async () => {
  const data = await getGerbangData();
  return (
    <RootLayout title='Gates Master Data' >
        <MasterGates data={data} />
    </RootLayout>
  )
}

export default MasterGatesPage