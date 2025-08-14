import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import SimpleBtn from "../Button/SimpleBtn";
import Table from "../Table/Table";
import useFetch from "../../hooks/useFetch";

function ProcessView() {
  const tableTitle = ["PID", "name", "memory", "CPU"];
  const [q, setQ] = useState("");

  const searchApps = (app) => {
    setQ(app);
  };

  const { data, refetch } = useFetch("/api/process");
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
      .filter((proc) => proc.name.toLowerCase().includes(q.toLowerCase()))
      .map((process, key) =>
        applications.push(
          <tr
            className="text-center hover:bg-gray-200/20 text-gray-800 border-b border-gray-600"
            key={key}
          >
            <td className="py-4">{process.pid}</td>
            <td className="py-4">{process.name}</td>
            <td className="py-4">{process.memory} Mo</td>
            <td className="py-4">{process.cpu / 100} %</td>
          </tr>
        )
      );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Processes</h1>
        <Input searchApps={searchApps} />
      </div>
      <div className="my-8">
        <Table titles={tableTitle} data={applications} />
      </div>
    </>
  );
}

export default ProcessView;
