import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import SimpleBtn from "../Button/SimpleBtn";
import Table from "../Table/Table";
import useFetch from "../../hooks/useFetch";
import { Outlet } from "react-router-dom";

function ApplicationsView() {
  const tableTitle = ["PID", "title", "CPU", "Actions"];
  const [q, setQ] = useState("");

  const searchApps = (app) => {
    setQ(app);
  };

  const { data, refetch } = useFetch("/api/applications");
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  let applications = [];
  if (data) {
    data
      .filter((proc) =>
        proc.window_title.toLowerCase().includes(q.toLowerCase())
      )
      .map((process, key) =>
        applications.push(
          <tr
            className="text-center hover:bg-gray-200/20 text-gray-800 border-b border-gray-600"
            key={key}
          >
            <td className="py-4">{process.pid}</td>
            <td className="py-4">{process.window_title}</td>
            <td className="py-4">{process.cpu_percent} %</td>
            <td>
              <div className="flex justify-center gap-4">
                <button className="py-2 px-4 text-white bg-green-600">Detail</button>
                <button className="py-2 px-4 text-white bg-red-600 opacity-70 hover:opacity-100">Quit</button>
              </div>
            </td>
          </tr>
        )
      );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">History</h1>
        <Input searchApps={searchApps} />
      </div>
      <div className="flex mt-8">
        {/* <div className="my-8"> */}
        <Table titles={tableTitle} data={applications} />
        {/* </div> */}
      </div>
    </>
  );
}

export default ApplicationsView;
