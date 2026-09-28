"use client"

import Select from "./components/Select"


export default function Home() {

  const options: string[] = []

  return (
    <div className="m-4">
      <Select label="選択肢" options={options} onChange={value => console.log(value)}/>
    </div>
  )
}
