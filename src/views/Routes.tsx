import React from "react";
import { FC } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PortfolioDetail from "./PortfolioDetail";
import Portfolios from "./Portfolios";
import { ROUTES } from "../config/routes";
import { Portfolio } from "../sharedTypes/portfolios";

interface RouteProps {
  portfolios: Portfolio[] | null;
}

const Routes: FC<RouteProps> = ({ portfolios }) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/portfolios" />
      <Route path={ROUTES.PORTFOLIO} exact>
        <PortfolioDetail />
      </Route>
      <Route path={ROUTES.PORTFOLIOS} exact>
        <Portfolios portfolios={portfolios} />
      </Route>
    </Switch>
  );
};

export default Routes;
