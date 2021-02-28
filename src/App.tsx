import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { CssBaseline, PaletteType } from "@material-ui/core";
import Routes from "./views/Routes";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Portfolio } from "./sharedTypes/portfolios";
import { getPortfolios } from "./services/getPortfolios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const browserHistory = createBrowserHistory();

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [theme, setTheme] = useState<PaletteType>("dark");

  const muiTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  console.log(theme);

  useEffect(() => {
    const loadPortfolios = async () => {
      setPortfolios(await getPortfolios());
    };
    loadPortfolios();
  }, []);
  return (
    <React.Fragment>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router history={browserHistory}>
          <Header setTheme={setTheme} theme={theme} />
          <Routes portfolios={portfolios} />
          <Footer />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}
