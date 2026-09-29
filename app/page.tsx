"use client"

import Select from "./components/Select"
import Table, { Column } from "./components/Table"


export default function Home() {

  const options: string[] = []

  type User = {
    id: number
    name: string
    age: number
    email: string
  }

  const data: User[] = [
    {
      id: 1,
      name: "田中太郎",
      age: 25,
      email: "tanaka@example.com",
    },
    {
      id: 2,
      name: "佐藤花子",
      age: 30,
      email: "sato@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
    {
      id: 3,
      name: "鈴木一郎",
      age: 28,
      email: "suzuki@example.com",
    },
  ]

  const columns: Column<User>[] = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      align: "right",
    },
    {
      key: "name",
      header: "名前",
      width: "150px",
    },
    {
      key: "age",
      header: "年齢",
      width: "100px",
      align: "right",
    },
    {
      key: "email",
      header: "メールアドレス",
    },
  ]

  return (
    <div className="m-4">
      <Table
        data={data}
        columns={columns}
        height="400px"
        dense
      />
    </div>
  )
}
