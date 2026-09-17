"use client"

import FileInput from "./components/FileInput";

export default function Home() {
  const handleChange = (fileList: FileList | null) => {
    if (!fileList) return

    console.log(fileList[0].name)
  }

  return (
    <div className="container mx-auto mt-4">
      <FileInput onChange={handleChange}/>
    </div>
  );
}
