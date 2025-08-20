import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { IoClose } from "react-icons/io5";

function ApplicationsDetails({ appDetail, isActive, hide }) {
  return (
    <div className="relative">
      <div
        className={`fixed top-0 ${
          isActive ? "right-0" : "-right-full"
        } bg-black/80 shadow-2xl duration-300 ease-in-out shadow-blue-400 h-full w-1/5`}
      >
        <div className="absolute top-2 left-2">
          <IoClose
            onClick={() => hide(false)}
            className="text-5xl text-gray-200 cursor-pointer"
          />
        </div>
        <div className="px-4 mt-20">
          <h2 className="text-white text-2xl">Detail:</h2>
          <p className="text-white py-3">
            Application: {appDetail.window_title}
          </p>
          <p className="text-white py-3">Process: {appDetail.process_name}</p>
        </div>
        <div className="flex justify-center">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: appDetail.cpu_percent,
                    label: "CPU",
                    color: "orange",
                  },
                  {
                    id: 1,
                    value: appDetail.memory,
                    label: "Memory",
                    color: "blue",
                  },
                ],
              },
            ]}
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ApplicationsDetails);
