import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface BarChartProps {
  data: { name: string; y: number }[];
  yTitle: string;
  xTitle: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, yTitle, xTitle }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data.map(item => item.name)
    },
    yAxis: {
      title: {
        text: yTitle
      }
    },
    series: [{
      name: xTitle,
      type: 'column',
      data: data.map(item => item.y)
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
