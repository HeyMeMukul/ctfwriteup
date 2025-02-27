import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-white font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-[#1e1e2e] text-white outline-none 
        focus:bg-[#282838] focus:border-[#bb86fc] focus:ring-2 focus:ring-[#bb86fc] 
        duration-200 border border-gray-600 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
