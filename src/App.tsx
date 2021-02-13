import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { CssBaseline } from "@material-ui/core";
import Routes from "./views/Routes";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Portfolio } from "./sharedTypes/portfolios";
import { getPortfolios } from "./services/getPortfolios";

const browserHistory = createBrowserHistory();

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);

  useEffect(() => {
    const loadPortfolios = async () => {
      setPortfolios(await getPortfolios());
    };
    loadPortfolios();
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Router history={browserHistory}>
        <Header />
        <Routes portfolios={portfolios} />
        <Footer />
      </Router>
    </React.Fragment>
  );
}
