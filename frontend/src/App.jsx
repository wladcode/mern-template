import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import Home from "./pages/home/Home";
import DSLoader from "./components/commons/ds/ds-loader/ds-loader";
import DSMessage from "./components/commons/ds/ds-messages/ds-message";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import LayoutPublic from "./components/layout/LayoutPublic";
import LayoutPay from "./components/layout/LayoutPay";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DataList } from "./pages/dataManagement/DataList";
import NotFound from "./components/commons/wc/notfound/NotFound";
import SpentTypeAdmin from "./pages/spentType/SpentTypeAdmin";
//import MarketingPage from "./components/templates/marketing-page/MarketingPage";
//import Dashboard2 from "./components/templates/dashboard/Dashboard";

function App() {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
    palette: {
      mode: "light",
      primary: {
        main: "#255bbc",
      },
      secondary: {
        main: "#8c5e0c",
      },
      background: {
        default: "#969090",
        paper: "#e0e0e0",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DSLoader />
        <DSMessage />

        <BrowserRouter>
          <Routes>
            <Route element={<LayoutPublic />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="easyDashboard" element={<LayoutPay />}>
              <Route index element={<Dashboard />} />
              <Route path="catalogs/example" element={<SpentTypeAdmin />} />
              <Route path="data" element={<DataList />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
