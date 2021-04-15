import React, { useState } from "react";
import { pink, deepPurple } from "@material-ui/core/colors";
import Header from "./components/Header";
import { CssBaseline, PaletteType } from "@material-ui/core";
import Routes from "./views/Routes";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Portfolio } from "./sharedTypes/portfolios";
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
      primary: {
        // Purple and green play nicely together.
        main: pink[600],
      },
      secondary: {
        // This is green.A700 as hex.
        main: deepPurple[500],
      },
    },
  });

  // useEffect(() => {
  //   const loadPortfolios = async () => {
  //     setPortfolios(await getPortfolios());
  //   };
  //   loadPortfolios();
  // }, []);
  return (
    <React.Fragment>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <StoreProvider>
          <Web3Data />
          <Router history={browserHistory}>
            <Header setTheme={setTheme} theme={theme} />
            <Routes />
            <Message />
            <Footer />
          </Router>
        </StoreProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
