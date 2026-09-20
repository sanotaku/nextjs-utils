"use client"

import DataTable from "./components/DataTable";


export default function Home() {
  const columnsArray: string[][] = [
    ["1", "2", "3"],
    ["A", "B", "C"],
  ]
  const indexArray: string[] = ["#1", "#2", "#3"]

  const data = [
    ["100", "200", "300"],
    ["400", "500", "600"],
    ["700", "800", "900"]
  ]

  return (
    <div className="m-4">
      <DataTable columnsArray={columnsArray} indexArray={indexArray} data={data}/>
    </div>

  );
}
