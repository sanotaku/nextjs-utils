"use client"

import FileInput from "./components/FileInput";

export default function Home() {
  const handleChange = (fileList: FileList | null) => {
    if (!fileList) return

    console.log(fileList[0].name)
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">項目</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">売上 (円)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">前年比</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-3 text-gray-900">4月度</td>
              <td className="px-4 py-3 text-right font-mono text-gray-900">1,234,500</td>
              <td className="px-4 py-3 text-right font-mono text-green-600">+12.5%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-900">5月度</td>
              <td className="px-4 py-3 text-right font-mono text-gray-900">980,000</td>
              <td className="px-4 py-3 text-right font-mono text-red-600">-3.2%</td>
            </tr>
          </tbody>
        </table>
      </div>    
    </>

  );
}
