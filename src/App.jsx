import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import ApplicationsView from "./components/views/ApplicationsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "apercu",
        element: <HomeView />,
      },
      {
        path: 'applications',
        element: <ApplicationsView />
      }
    ],
  },
]);

const links = [
  {
    name: "Aperçu",
    link: "/aperçu",
  },
  {
    name: "Applications",
    link: "/application",
  },
  {
    name: "Historique",
    link: "/history",
  },
  {
    name: "Processus",
    link: "/processus",
  },
];

function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <div className="flex items-baseline">
      <SideNav links={links} />
      <div className="w-4/5 relative left-1/5 container px-4 my-4">
        <div className="flex items-center justify-end">
          <h1 className="text-2xl">Computer name</h1>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
