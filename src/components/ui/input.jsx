import * as React from "react"

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full items-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
