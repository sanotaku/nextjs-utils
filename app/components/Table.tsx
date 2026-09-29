"use client"

import type { ReactNode } from "react"

export type Column<T> = {
  key: keyof T
  header: string
  width?: string
  align?: "left" | "center" | "right"
  render?: (row: T) => ReactNode
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
  rowKey?: (row: T, index: number) => string | number
  onRowClick?: (row: T) => void
  height?: string
  dense?: boolean
}

export default function Table<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  height,
  dense = false
}: TableProps<T>) {
  const getAlignClass = (align: Column<T>["align"]) => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const heightClassHeader = dense ? "h-8" : "h-11"
  const heightClassBody = dense ? "h-8" : "h-12"

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white">
      {/* Header */}
      <table className="w-full border-collapse text-sm">
        <thead className="bg-neutral-50">
          <tr className="border-b border-neutral-200">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                style={{ width: column.width }}
                className={`
                  ${heightClassHeader}
                  px-4
                  font-medium
                  text-neutral-600
                  ${getAlignClass(column.align)}
                `}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      {/* Body */}
      <div
        className="overflow-y-auto overflow-x-auto"
        style={height ? { height } : undefined}
      >
        <table className="w-full border-collapse text-sm">
          <tbody>
            {data.map((row, index) => (
              <tr
                key={rowKey ? rowKey(row, index) : index}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b
                  border-neutral-100
                  last:border-b-0
                  hover:bg-blue-50
                  ${
                    onRowClick
                      ? "cursor-pointer hover:bg-neutral-50"
                      : ""
                  }
                `}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    style={{ width: column.width }}
                    className={`
                      ${heightClassBody}
                      px-4
                      text-neutral-900
                      ${getAlignClass(column.align)}
                    `}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
