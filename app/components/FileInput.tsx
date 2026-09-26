"use client"

type FileInputProps = {
  onChange: (fileList: FileList | null) => void
}

export default function FileInput({ onChange }: FileInputProps) {
  return (
    <>
      {/* <div className="max-w-sm w-full space-y-3">
        <label className="block">
          <input type="file" className="block w-full text-sm text-muted-foreground-1
            focus:outline-hidden
            file:me-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:cursor-pointer
            border border-neutral-500 rounded-lg
            file:bg-blue-500 file:text-white hover:file:bg-blue-800
            disabled:file:opacity-50 disabled:file:pointer-events-none"
            onChange={(e) => onChange(e.target.files)}/>
        </label>
      </div> */}

      {/* <hr className="my-4"></hr> */}

      <div>
        <label htmlFor="small-file-input" className="sr-only">Choose file</label>
        <input type="file" name="small-file-input" id="small-file-input"
          className="
          block w-120
          bg-blue-100
          border border-black
          rounded-lg
          text-sm text-black
          placeholder:text-muted-foreground-1
          focus:z-10 focus:outline-hidden focus:border-primary-focus focus:ring-1 focus:ring-primary-focus
          disabled:opacity-50 disabled:pointer-events-none
          file:bg-surface file:border-0 file:me-4 file:py-2 file:px-4 file:font-semibold"
          onChange={(e) => onChange(e.target.files)}/>
      </div>

    </>
  )
}
