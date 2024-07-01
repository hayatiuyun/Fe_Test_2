import React, { useEffect, useState } from "react";
import Highcharts, { ColorType } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieChartProps {
  data: { name: string; y: number }[];
}

type ColorsType = ColorType[];

const initialOptions: Highcharts.Options = {
  chart: {
    type: "pie",
    plotBackgroundColor: undefined,
    plotBorderWidth: undefined,
    plotShadow: false,
  },

  title: {
    text: "Pie Chart Example",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      borderRadius: 5,
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
        distance: -50,
        filter: {
          property: "percentage",
          operator: ">",
          value: 4,
        },
      },
    },
  },
  series: [],
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false,
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    xAxis: {
      title: {
        text: "Total Count",
      },
    },
    legend: {
      enabled: true,
      // make legend in left bottom
      floating: true,
      layout: "vertical",
      align: "left",
      verticalAlign: "bottom",
      backgroundColor: "white",

      x: 0,
      y: 0,
      itemStyle: {
        color: "#333",
        fontWeight: "normal",
      },
      title: {
        text: "Total Traffic",
      },
      labelFormat: "{name} - {percentage:.1f}% → ({y})",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        size: "70%",
        cursor: "pointer",
        colors: ["#13459c", "#1557c0", "#2382f7"],
        borderRadius: 5,
        showInLegend: true,
        dataLabels: {
          enabled: true,
          borderRadius: 5,
          backgroundColor: "#FFF",
          borderWidth: 0.5,
          borderColor: "#DDD",
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -5,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: "Total Traffic",
        type: "pie",
        data: data.map((item) => ({ name: item.name, y: item.y })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
