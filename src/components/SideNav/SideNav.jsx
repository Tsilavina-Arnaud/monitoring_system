import React from "react";
import LinkButton from "../Button/LinkButton";

function SideNav({ links }) {
  const link = links.map((link, key) => (
    <LinkButton key={key} link={link} icon={link.icon} />
  ));

  return (
    <div className="w-1/5 bg-blue-800 fixed h-full">
      <div className="flex justify-center">
        <h2 className="text-xl text-white my-14">Performa</h2>
      </div>
      <div className="my-">{link}</div>
    </div>
  );
}

export default SideNav;
