import React from "react";
import { NavLink } from "react-router-dom";

function LinkButton({ link }) {
  return (
    <div className="flex items-center">
      <div></div>
      <div className="w-full">
        <NavLink to={link.link}>
          <button className="my-2 hover:bg-white hover:cursor-pointer hover:text-blue-800 duration-300 ease-in-out text-white py-4 px-4 w-full block">
            {link.name}
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default LinkButton;
