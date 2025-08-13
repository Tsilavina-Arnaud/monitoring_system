import React from "react";
import Input from "../Form/Input";
import SimpleBtn from "../Button/SimpleBtn";
import Table from "../Table/Table";
import { Outlet } from "react-router-dom";

function ApplicationsView() {
  const tableTitle = ["PID", "name", "username", "CPU", "Actions"];

  const searchApps = (q) => {
    if (q) {
      applications = [];
    }
  };

  let applications = [];
  for (let i = 0; i < 100; i++) {
    applications.push(
      <tr
        className="text-center hover:bg-gray-200/20 text-gray-800 border-b border-gray-600"
        key={i}
      >
        <td className="py-4">{i}</td>
        <td className="py-4">process {i}</td>
        <td className="py-4">Tsilavina</td>
        <td className="py-4">{i * Math.random()} %</td>
        <td className="py-4">
          <div className="flex items-center justify-center gap-4">
            <button className="bg-amber-400">Details</button>
            <button className="bg-red-600">Quit</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Applications</h1>
        <Input searchApps={searchApps} />
        <div>
          <SimpleBtn label="Show details" bg="bg-amber-400" />
        </div>
        <div>
          <SimpleBtn label="Quit application" bg="bg-red-600" />
        </div>
      </div>
      <div className="flex">
        <div className="my-8">
          <Table titles={tableTitle} data={applications} />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ApplicationsView;
