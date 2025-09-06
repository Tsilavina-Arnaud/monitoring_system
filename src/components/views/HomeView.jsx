import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import useFetch from "../../hooks/useFetch";
import ApplicationsView from "./ApplicationsView";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

function HomeView() {
  const { data, refetch } = useFetch("/api/overview");

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 1000);
  }, [refetch]);

  let DDrive = data["D:"];
  let CDrive = data["C:"];
  let memory = data["memory"];

  const view = (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-5">
        <div className=" col-span-1 border-2 border-gray-600 rounded-2xl py-4">
          <div className="flex justify-center items-center">
            <div>
              <div>
                <h3 className="text-center text-2xl">Disk C:</h3>
                <div className="flex justify-center">
                  <GaugeContainer
                    width={200}
                    height={200}
                    startAngle={-110}
                    endAngle={110}
                    value={(CDrive?.used * 100) / CDrive?.total}
                  >
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugePointer />
                  </GaugeContainer>
                </div>
              </div>
              <div className="my-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Gauge width={100} height={100} value={CDrive?.used} />
                    <p className="text-center text-sm text-gray-400">Used</p>
                  </div>
                  <div>
                    <Gauge width={100} height={100} value={CDrive?.free} />
                    <p className="text-center text-sm text-gray-400">Free</p>
                  </div>
                  <div>
                    <Gauge width={100} height={100} value={CDrive?.total} />
                    <p className="text-center text-sm text-gray-400">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1 border-2 border-gray-600 rounded-2xl py-4">
          <div className="flex justify-center items-center">
            <div>
              <div>
                <h3 className="text-center text-2xl">Disk D:</h3>
                <div className="flex justify-center">
                  <GaugeContainer
                    width={200}
                    height={200}
                    startAngle={-110}
                    endAngle={110}
                    value={(DDrive?.used * 100) / DDrive?.total}
                  >
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugePointer />
                  </GaugeContainer>
                </div>
              </div>
              <div className="my-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Gauge width={100} height={100} value={DDrive?.used} />
                    <p className="text-center text-sm text-gray-400">Used</p>
                  </div>
                  <div>
                    <Gauge width={100} height={100} value={DDrive?.free} />
                    <p className="text-center text-sm text-gray-400">Free</p>
                  </div>
                  <div>
                    <Gauge width={100} height={100} value={DDrive?.total} />
                    <p className="text-center text-sm text-gray-400">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1 border-2 border-gray-600 rounded-2xl py-4">
          <div className="flex justify-center items-center">
            <div>
              <h3 className="text-center text-2xl">CPU</h3>
              <GaugeContainer
                width={200}
                height={200}
                startAngle={-110}
                endAngle={110}
                value={data.cpu}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
            </div>
          </div>
        </div>
        <div className=" col-span-1 border-2 border-gray-600 rounded-2xl py-4">
          <div className="flex justify-center items-center">
            <div>
              <div>
                <h3 className="text-center text-2xl">Memory</h3>
                <div className="flex justify-center">
                  <GaugeContainer
                    width={200}
                    height={200}
                    startAngle={-110}
                    endAngle={110}
                    value={(memory?.used * 100) / memory?.total}
                  >
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugePointer />
                  </GaugeContainer>
                </div>
              </div>
              <div className="my-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Gauge
                      width={100}
                      height={100}
                      value={(memory?.used * 100) / memory?.total}
                    />
                    <p className="text-center text-sm text-gray-400">Used</p>
                  </div>
                  <div>
                    <Gauge
                      width={100}
                      height={100}
                      value={(memory?.free * 100) / memory?.total}
                    />
                    <p className="text-center text-sm text-gray-400">Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <ApplicationsView />
      </div>
    </div>
  );

  return <div>{data ? view : "Loading"}</div>;
}

export default HomeView;
