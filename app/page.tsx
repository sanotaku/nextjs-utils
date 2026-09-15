"use client"

import Link from "next/link";
import BarChartComponent from "./components/charts/BarChartComponent";
import BoxPlot from "./components/charts/BoxPlot";
import DataTable from "./components/Table";
import ScatterGroupPlot from "./components/charts/ScatterGroupPlot";


export default function Home() {

  const data = [
    {
      name: 'Page A',
      uv: 400,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 300,
      pv: 4567,
      amt: 2400,
    },
    {
      name: 'Page C',
      uv: 320,
      pv: 1398,
      amt: 2400,
    },
    {
      name: 'Page D',
      uv: 200,
      pv: 9800,
      amt: 2400,
    },
    {
      name: 'Page E',
      uv: 278,
      pv: 3908,
      amt: 2400,
    },
    {
      name: 'Page F',
      uv: 189,
      pv: 4800,
      amt: 2400,
    },
  ];


  return (
    <div>
      <p>This is root page</p>
      {/* <BarChartComponent data={data} /> */}
      {/* <BoxPlot
        data={[
          { category: "A", values: [12, 15, 18, 20, 21, 25] },
          { category: "B", values: [8, 10, 12, 13, 15, 17, 25] },
          { category: "C", values: [20, 21, 22, 25, 27, 30, 35, 100] },
        ]}
      /> */}


      {/* <DataTable
       data={data}
       rowKey={datum => datum.name}
       columns={[
        {
          key: "name",
          header: "名前",
          render: (datum) => <a><p className="bg-green-100 rounded-full">{datum.name}</p></a>
        },
        {
          key: "uv",
          header: "UV"
        },
        {
          key: "amt",
          header: "Amount"
        },
        {
          key: "pv",
          header: "PV"
        }
       ]}
      /> */}
      <ScatterGroupPlot
        data={[
          { category: "A", values: [12, 15, 18, 20, 21, 25] },
          { category: "B", values: [8, 10, 12, 13, 15, 17, 25] },
          { category: "C", values: [20, 21, 22, 25, 27, 30, 35, 100] },
        ]}
      />
    </div>
  );
}
