"use client"

import DataTable from "./components/DataTable";
import FileInput from "./components/FileInput";


export default function Home() {

  const handleChange = (fileList: FileList | null) => {
    if (!fileList) return

    const file = fileList[0]
    const url = URL.createObjectURL(file)
  }

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
      <FileInput onChange={handleChange}/>
      <DataTable columnsArray={columnsArray} indexArray={indexArray} data={data}/>
    </div>
  )
}
