"use client"

import type { ReactNode } from "react"

export type Column<T> = {
  key: keyof T
  header: string
  width?: string
  align?: "left" | "center" | "right"
  render?: (row: T) => ReactNode
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  rowKey?: (row: T, index: number) => string | number
  onRowClick?: (row: T) => void
}

export default function DataTable<T>({
  data,
  columns,
  rowKey,
  onRowClick,
}: DataTableProps<T>) {
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

  return (
    <div className="w-full overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-neutral-50">
            <tr className="border-b border-neutral-200">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className={`
                    h-11
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

          <tbody>
            {data.map((row, index) => (
              <tr
                key={rowKey ? rowKey(row, index) : index}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b
                  border-neutral-100
                  last:border-b-0
                  transition-colors
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
                    className={`
                      h-12
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
