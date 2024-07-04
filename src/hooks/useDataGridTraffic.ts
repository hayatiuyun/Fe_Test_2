"use client";
import { Traffic } from "@/types/traffics";

export default function useDataGridTraffic(data: Traffic[]) {
  const dataWithGolongan = (data: any[]) => {
    const summarizedData = data.reduce((acc, curr) => {
        const date = new Date(curr.Tanggal);
        const day = date.toLocaleDateString('id-ID', { weekday: 'long' });
    
        // Find or create a group
        let group = acc.find((item: any) =>
            item.Ruas === curr.ruas &&
            item.Gerbang === curr.gerbang &&
            item.Gardu === curr.IdGardu &&
            item.Hari === day &&
            item.Tanggal === date.toISOString().split('T')[0]
        );
    
        if (!group) {
            group = {
                Ruas: curr.ruas,
                Gerbang: curr.gerbang,
                IdCabang: curr.IdCabang,
                IdGerbang: curr.IdGerbang,
                Gardu: curr.IdGardu.toString().padStart(2, '0'),
                Hari: day,
                Tanggal: date.toISOString().split('T')[0],
                payment_method: 'E-Toll',
                Gol1: 0,
                Gol2: 0,
                Gol3: 0,
                Gol4: 0,
                Gol5: 0,
                total: 0
            };
            acc.push(group);
        }
    
        // Sum up the values
        const totalPayment = curr.eMandiri + curr.eBri + curr.eBni + curr.eBca + curr.eNobu + curr.eDKI + curr.eMega + curr.eFlo + curr.DinasOpr + curr.DinasMitra + curr.DinasKary + curr.Tunai;
        switch (curr.Golongan) {
            case 1:
                group.Gol1 += totalPayment;
                break;
            case 2:
                group.Gol2 += totalPayment;
                break;
            case 3:
                group.Gol3 += totalPayment;
                break;
            case 4:
                group.Gol4+= totalPayment;
                break;
            case 5:
                group.Gol5 += totalPayment;
                break;
        }
    
        // Calculate total lalin
        group.total = group.Gol1 + group.Gol2 + group.Gol3 + group.Gol4 + group.Gol5;
        group.payment_method = curr.payment_method;
        group.no = curr.id;
        group.IdCabang  = curr.IdCabang;
        group.IdGerbang = curr.IdGerbang;
        return acc;
    }, []);
    
    return summarizedData;
  };

  if (!data) return [];

  return dataWithGolongan(data);
}
