"use client"

import {
  ScatterChart,
  XAxis,
  YAxis,
  Scatter,
  Tooltip,
  CartesianGrid
} from "recharts"

type ScatterGroupPlotDatum = {
  category: string
  values: number[]

}

type ScatterGroupPlotProps = {
  data: ScatterGroupPlotDatum[]
  xlabel?: string
  ylabel: string
}

const getAverage = (arr: number[]): number => {
  if (arr.length === 0) return 0
  const sum = arr.reduce((acc, current) => acc + current, 0)
  return sum / arr.length
}

const getMedian = (arr: number[]): number => {
  if (arr.length === 0) return 0
  const mid = Math.floor(arr.length / 2)
  return arr.length % 2 !== 0 
    ? arr[mid] 
    : (arr[mid - 1] + arr[mid]) / 2
}

function getStandardDeviation(arr: number[]): number {
  const n = arr.length
  if (n <= 1) return 0

  // 平均を計算
  const mean = arr.reduce((sum, val) => sum + val, 0) / n

  // 偏差平方和を計算
  const squaredDiffSum = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0)

  // n - 1 で割って不偏分散を求め、平方根をとる
  const unbiasedVariance = squaredDiffSum / (n - 1)
  return Math.sqrt(unbiasedVariance)
}

export default function ScatterGroupPlot({data, xlabel = "", ylabel}: ScatterGroupPlotProps) {
  const scatterData = data.flatMap((datum, index) =>
    datum.values.map((value) => ({
      x: index,
      y: value,
      category: datum.category,
    }))
  )


  function GroupTooltip({active, payload}: any) {
    if (!active || !payload?.length) {
      return null
    }
    
    const category = payload[0].payload.category
    const group = data.find((d) => d.category === category)
  
    if (!group) {
      return null
    }
  
    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
        <p className="mb-1 font-medium">{group.category}</p>  
        <div className="text-sm text-gray-600">平均　　：{getAverage(group.values)}</div>
        <div className="text-sm text-gray-600">中央値　：{getMedian(group.values)}</div>
        <div className="text-sm text-gray-600">標準偏差：{Math.round(getStandardDeviation(group.values) * 100) / 100}</div>
        <div className="text-sm text-gray-600">最大値　：{Math.max(...group.values)}</div>
        <div className="text-sm text-gray-600">最小値　：{Math.min(...group.values)}</div>
      </div>
    );
  }


  return (
    <ScatterChart style={{ width: "100%", maxWidth: "700px", aspectRatio: 1.618, padding: "8px" }}>
      <XAxis
        type="number"
        dataKey="x"
        domain={[-0.5, data.length - 0.5]}
        ticks={data.map((_, index) => index)}
        tickFormatter={(value) => data[value]?.category ?? ""}
        label={{ value: xlabel}}
      />

      <YAxis type="number" dataKey="y" label={{ value: ylabel, angle: -90, position: "insideLeft"}}/>

      <Scatter data={scatterData} dataKey="y" fill="#00C49F"/>

      <Tooltip content={GroupTooltip} isAnimationActive={false}/>
      <CartesianGrid />
    </ScatterChart>
  )
}
