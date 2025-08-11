import React from "react";

function Table({ titles, data }) {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="border-b text-center border-gray-600 py-4 font-bold">
            {titles.map((title, key) => (
              <td key={key}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </>
  );
}

export default Table;
