import "./App.css";
import "react-toastify/dist/ReactToastify.css";
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
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";

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
    name: "Overview",
    link: "/",
    icon: <IoMdSpeedometer className="text-2xl" />,
  },
  {
    name: "Applications",
    link: "/applications",
    icon: <MdDashboard className="text-2xl" />,
  },
  {
    name: "History",
    link: "/history",
    icon: <FaChartLine className="text-2xl" />,
  },
  {
    name: "Processes",
    link: "/process",
    icon: <VscServerProcess className="text-2xl" />,
  },
];

function App() {
  return <RouterProvider router={router} />;
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function Root() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
      ;
    </>
  );
}

function MyApp() {
  const { data } = useFetch("/api/hostname");
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <>
      <div className="flex items-baseline">
        <SideNav links={links} />
        <div className="w-4/5 relative left-1/5 container px-4 my-4">
          <div className="flex items-center justify-between">
            <div>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                  minHeight: "56px",
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-theme-toggle"
                    name="theme-toggle"
                    row
                    value={mode}
                    onChange={(event) => setMode(event.target.value)}
                  >
                    <FormControlLabel
                      value="system"
                      control={<Radio />}
                      label="System"
                    />
                    <FormControlLabel
                      value="light"
                      control={<Radio />}
                      label="Light"
                    />
                    <FormControlLabel
                      value="dark"
                      control={<Radio />}
                      label="Dark"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </div>
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
