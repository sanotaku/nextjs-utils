"use client";

import {
  BarChart,
  BarShapeProps,
  Rectangle,
  Bar,
  XAxis,
  YAxis,
  ErrorBar,
  DefaultZIndexes,
  Scatter,
} from 'recharts';


type BoxPlotDatum = {
  category: string
  values: number[]
}

type BoxPlotProps = {
  data: BoxPlotDatum[]
}

type CalculatedBoxPlotDatum = {
  category: string
  max: number
  q3: number
  median: number
  q1: number
  min: number
  outliers: number[]
  x: number
};


const BoxDataKey = (entry: CalculatedBoxPlotDatum): [number, number] => {
  return [entry.q1, entry.q3]
}

const WhiskerDataKey = (entry: CalculatedBoxPlotDatum): [number, number] => {
  return [entry.q3 - entry.min, entry.max - entry.q3,]
}

const BoxShape = (props: BarShapeProps) => {

  // @ts-expect-error Recharts
  const entry: CalculatedBoxPlotDatum = props;

  const quartileRange = entry.q3 - entry.q1;
  const medianOffset =
    quartileRange === 0 ? props.height / 2 : ((entry.q3 - entry.median) / quartileRange) * props.height;
  const medianY = props.y + medianOffset;

  return (
    <g>
      <Rectangle {...props} />
      <line x1={props.x} x2={props.x + props.width} y1={medianY} y2={medianY} stroke="#1f2937" strokeWidth={2} />
    </g>
  );
};


const createCalculatedBoxPlotDatum = (data: BoxPlotDatum[]): CalculatedBoxPlotDatum[] => {
  function getMedian(arr: number[]): number {
    if (arr.length === 0) return 0;
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 
      ? arr[mid] 
      : (arr[mid - 1] + arr[mid]) / 2;
  }

  const calculatedBoxPlotData: CalculatedBoxPlotDatum[] = data.map((datum, idx) => {
    const sortedValues = [...datum.values].sort((a, b) => a - b);

    const mid = Math.floor(sortedValues.length / 2);
    const lowerHalf = sortedValues.slice(0, mid);
    const upperHalf = sortedValues.length % 2 !== 0 
      ? sortedValues.slice(mid + 1) 
      : sortedValues.slice(mid);
  
    const q1 = getMedian(lowerHalf)    // 第1四分位
    const q2 = getMedian(sortedValues) // 第2四分位
    const q3 = getMedian(upperHalf)    // 第3四分位

    const iqr = q3 - q1

    const lowerFence = q1 - 1.5 * iqr // 外れ値下限
    const upperFence = q3 + 1.5 * iqr // 外れ値上限

    // 外れ値を除いたデータセット
    const nonOutliers = sortedValues.filter(v => v >= lowerFence && v <= upperFence)
    const outliers = sortedValues.filter(v => v < lowerFence || upperFence < v)

    const minWhisker = nonOutliers[0]                      // ヒゲ下限
    const maxWhisker = nonOutliers[nonOutliers.length - 1] // ヒゲ上限

    return {
      "category": datum.category,
      "max": maxWhisker,
      "q3": q3,
      "median": q2,
      "q1": q1,
      "min": minWhisker,
      "outliers": outliers,
      "x": idx
    }
  })

  return calculatedBoxPlotData
}


export default function BoxPlot({data}: BoxPlotProps) {

  const calculatedBoxPlotData = createCalculatedBoxPlotDatum(data)

  const scatterData = calculatedBoxPlotData.flatMap((datum, index) =>
    datum.outliers.map(value => ({
      x: index,
      y: value,
      boxPlot: datum,
    }))
  )

  return (
    <>
      <BarChart
       data={calculatedBoxPlotData}
       style={{ width: 'auto', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      >

        <Scatter data={scatterData} dataKey="y" shape="circle" tooltipType="none"/>

        <Bar dataKey={BoxDataKey} shape={BoxShape} fill="#0ea5e9" fillOpacity={0.80} name="Box plot">
          <ErrorBar dataKey={WhiskerDataKey} width={6} zIndex={DefaultZIndexes.bar - 1}/>
        </Bar>
        <XAxis
          type="number"
          dataKey="x"
          domain={[-0.5, calculatedBoxPlotData.length - 0.5]}
          ticks={calculatedBoxPlotData.map((_, index) => index)}
          tickFormatter={value => calculatedBoxPlotData[value]?.category ?? ""}
        />
        <YAxis/>

      </BarChart>
    </>
  )
}
