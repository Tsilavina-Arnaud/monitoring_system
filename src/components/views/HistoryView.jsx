import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import SimpleBtn from "../Button/SimpleBtn";
import Table from "../Table/Table";
import useFetch from "../../hooks/useFetch";
import moment from 'moment'

function HistoryView() {
  const tableTitle = ["PID", "name", "title", "memory", "Start At"];
  const [q, setQ] = useState("");

  const searchApps = (app) => {
    setQ(app);
  };

  const { data, refetch } = useFetch("/api/histories");
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
      .filter((proc) => proc.process_name.toLowerCase().includes(q.toLowerCase()))
      .map((process, key) =>
        applications.push(
          <tr
            className="text-center hover:bg-gray-200/20 text-gray-800 border-b border-gray-600"
            key={key}
          >
            <td className="py-4">{process.pid}</td>
            <td className="py-4">{process.process_name}</td>
            <td className="py-4">{process.window_title}</td>
            <td className="py-4">{process.memory} %</td>
            <td className="py-4">{moment(process.startAt).format("MM-DD-YYYY hh:mm:ss")}</td>
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
      <div className="my-8">
        <Table titles={tableTitle} data={applications} />
      </div>
    </>
  );
}

export default HistoryView;
