import { type ApexOptions } from "apexcharts";

export const heatMapOptions: ApexOptions = {
  chart: {
    type: "heatmap",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    heatmap: {
      radius: 4,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 0,
            color: "#d1d5db",
            name: " ",
          },
          {
            from: 1,
            to: 1,
            color: "#16a34a",
            name: " ",
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "Progress this year",
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};
