import {
  Line,
  LineChart,
  Legend,
  XAxis,
  YAxis
} from "recharts"


type BarChartComponentProps = {
  data: object[]
}


export default function LineChartComponent({data}: BarChartComponentProps) {

  return (
    <LineChart responsive data={data} style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}>
      {
        Object.keys(data[0]).map((v, i) => (
          <Line key={i} dataKey={v} />
        ))
      }
      <Legend />
      <XAxis />
      <YAxis />
    </LineChart>
  )
}
