import React from "react";

function SimpleBtn({ label, bg }) {
  return (
    <>
      <button
        className={
          "my-2 text-white opacity-70 hover:opacity-100 rounded-md hover:cursor-pointer duration-300 ease-in-out py-2 px-4 w-full block " +
          bg
        }
      >
        {label}
      </button>
    </>
  );
}

export default SimpleBtn;
