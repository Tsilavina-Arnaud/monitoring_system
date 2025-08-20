import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import SideNav from "./components/SideNav/SideNav";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import ApplicationsView from "./components/views/ApplicationsView";
import HistoryView from "./components/views/HistoryView";
import ProcessView from "./components/views/ProcessView";
import ApplicationsDetails from "./components/views/ApplicationsDetails";
import useFetch from "./hooks/useFetch";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { IoMdSpeedometer } from "react-icons/io";
import { VscServerProcess } from "react-icons/vsc";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "applications",
        element: <ApplicationsView />,
      },
      {
        path: "history",
        element: <HistoryView />,
      },
      {
        path: "process",
        element: <ProcessView />,
      },
    ],
  },
]);

const links = [
  {
    name: "Aperçu",
    link: "/",
    icon: <IoMdSpeedometer className="text-2xl" />
  },
  {
    name: "Applications",
    link: "/applications",
    icon: <MdDashboard className="text-2xl" />
  },
  {
    name: "Historique",
    link: "/history",
    icon: <FaChartLine className="text-2xl" />
  },
  {
    name: "Processus",
    link: "/process",
    icon: <VscServerProcess className="text-2xl" />
  },
];

function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const {data} = useFetch('/api/hostname')

  return (
    <>
      <div className="flex items-baseline">
        <SideNav links={links} />
        <div className="w-4/5 relative left-1/5 container px-4 my-4">
          <div className="flex items-center justify-end">
            <h1 className="text-2xl mx-8">{data.hostname}</h1>
          </div>
          <div className="mt-8">
            <div className="mx-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
