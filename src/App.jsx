import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import ApplicationsView from "./components/views/ApplicationsView";
import HistoryView from "./components/views/HistoryView";
import ProcessView from "./components/views/ProcessView";
import ApplicationsDetails from "./components/views/ApplicationsDetails";
import { useEffect, useState } from "react";

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
        children: [
          {
            path: "/applications/:id",
            element: <ApplicationsDetails />,
          },
        ],
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
  },
  {
    name: "Applications",
    link: "/applications",
  },
  {
    name: "Historique",
    link: "/history",
  },
  {
    name: "Processus",
    link: "/process",
  },
];

function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const [hostname, setHostname] = useState('');
  useEffect(() => {
    fetch("/api/hostname")
      .then((res) => res.json())
      .then((data) => setHostname(data));
  }, [])

  return (
    <>
      <div className="flex items-baseline">
        <SideNav links={links} />
        <div className="w-4/5 relative left-1/5 container px-4 my-4">
          <div className="flex items-center justify-end">
            <h1 className="text-2xl">{hostname.hostname}</h1>
          </div>
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
