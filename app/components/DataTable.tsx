"use client"
type DataTableProps = {
  columnsArray: string[][]
  indexArray: string[]
  data: string[][]
}



export default function DataTable({columnsArray, indexArray, data}: DataTableProps) {

  const displayColumns = columnsArray.map(columns => ["", ...columns])

  const handleDownload = () => {

    const conbinedData = []

    for (let index = 0; index < data.length; index++) {
      const tmp = [indexArray[index]]
      for (const element of data[index]) {
        tmp.push(element)
      }
      conbinedData.push(tmp)
    }

    const csvText = [displayColumns, ...conbinedData]
      .map((row) => row.join(",")).join("\n")
  
    // Excelなどで文字化けしにくくする
    const blob = new Blob(["\uFEFF" + csvText], { type: "text/csv;charset=utf-8;" })
  
    const url = URL.createObjectURL(blob)
  
    const a = document.createElement("a")
    a.href = url
    a.download = "data.csv"
    a.click()
  
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 text-sm shadow-md">
          <thead className="divide-y divide-gray-200 bg-gray-50">
            {displayColumns.map((columns, idx) => (
              <tr key={idx}>
                {columns.map(column => <th className="w-20 px-1 py-1 text-center font-medium text-gray-500" key={column}>{column}</th>)}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-x divide-gray-200 bg-white">
            
            {data.map((dataRecord, idx) => (
              <tr key={idx} className="hover:bg-blue-50 text-center">
                <td className="px-4 py-1 text-gray-900">{indexArray[idx]}</td>
                {dataRecord.map(datum => (<td key={datum} className="px-1 py-1 text-gray-900 text-center">{datum}</td>))}
              </tr>
            ))}
          </tbody>
        </table>

        <button className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white my-2 px-2 py-1 rounded-md" onClick={handleDownload}>csvでダウンロード</button>
      </div>  
    </>
  )
}
