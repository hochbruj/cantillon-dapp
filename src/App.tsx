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
import { StoreProvider } from "./store/store";
import Web3Data from "./components/Web3Data";
import Message from "./components/Message";

const browserHistory = createBrowserHistory();

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [theme, setTheme] = useState<PaletteType>("dark");

  const muiTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

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
        <StoreProvider>
          <Web3Data />
          <Router history={browserHistory}>
            <Header setTheme={setTheme} theme={theme} />
            <Routes portfolios={portfolios} />
            <Message />
            <Footer />
          </Router>
        </StoreProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
