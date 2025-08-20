import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import SimpleBtn from "../Button/SimpleBtn";
import Table from "../Table/Table";
import useFetch from "../../hooks/useFetch";
import { Outlet } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ApplicationsDetails from "./ApplicationsDetails";

function ApplicationsView() {
  const tableTitle = ["PID", "title", "CPU", "Actions"];
  const [q, setQ] = useState("");
  const [appDetail, setAppDetail] = useState("");
  const [isActive, setNotActive] = useState(false);

  const searchApps = (app) => {
    setQ(app);
  };

  function quitApplication(pid) {
    axios
      .post("/api/applications/quit", {
        pid: pid,
      })
      .then((response) => {
        const data = response.data;
        switch (data.response) {
          case "success":
            toast.success(data.message);
            break;
          case "error":
            toast.error(data.message);
            break;
          case "warning":
            toast.warn(data.message);
            break;
          default:
            break;
        }
      });
  }

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
                <button
                  onClick={() => quitApplication(process.pid)}
                  className="py-2 px-4 text-xl cursor-pointer font-bold text-red-600"
                >
                  <IoIosLogOut />
                </button>
                <button className="py-2 px-4 text-xl cursor-pointer font-bold text-green-600">
                  <IoEyeOutline
                    onClick={() => {
                      setAppDetail(process), 
                      setNotActive(true);
                    }}
                  />
                </button>
              </div>
            </td>
          </tr>
        )
      );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between gap-7">
        <h1 className="text-2xl">Applications</h1>
        <Input searchApps={searchApps} />
      </div>
      <div className="flex mt-8">
        <Table titles={tableTitle} data={applications} />
      </div>
      <ApplicationsDetails appDetail={appDetail} isActive={isActive} hide={setNotActive} />
    </>
  );
}

export default ApplicationsView;
