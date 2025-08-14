import React, { useRef } from "react";

export default function Input({searchApps}) {

  const q = useRef('vaue')
  
   const handleInput = () => {
    searchApps(q.current.value)
   }

  return (
    <div className="relative">
      <input ref={q} placeholder="search" onInput={handleInput}
        type="text"
        className="border-blue-400 border-2 py-1 focus:outline-none focus:border-blue-800 focus:shadow-md duration-300 ease-in-out rounded-md px-4 text-gray-600"
      />
    </div>
  );
}
