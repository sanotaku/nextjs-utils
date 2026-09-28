'use client'

import { useId, useState } from 'react';

type SelectProps = {
  label: string
  options: string[]
  onChange?: (value: string) => void
}


export default function Select({ label = "", options, onChange = () => {} }: SelectProps) {
  const id = useId()

  const [selectedValue, setSelectedValue] = useState(options[0])

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <div className="flex p-4 space-x-2 items-baseline">
      <label htmlFor={id} className="block mb-2 font-medium">{label}</label>
      <select
        id={id}
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded p-2 bg-white text-black min-w-32"
      >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}
