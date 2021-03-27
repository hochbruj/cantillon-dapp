import { Switch, Redirect, Route } from "react-router-dom";
import PortfolioDetail from "./PortfolioDetail";
import Portfolios from "./Portfolios";
import { ROUTES } from "../config/routes";
import Dashboard from "./Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/portfolios" />
      <Route path={ROUTES.DASHBOARD} exact>
        <Dashboard />
      </Route>
      <Route path={ROUTES.PORTFOLIO} exact>
        <PortfolioDetail />
      </Route>
      <Route path={ROUTES.PORTFOLIOS} exact>
        <Portfolios />
      </Route>
    </Switch>
  );
};

export default Routes;
