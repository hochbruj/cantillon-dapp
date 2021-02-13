import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PieChartIcon from "@material-ui/icons/PieChart";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <AppBar position="relative">
      <Toolbar>
        {location.pathname === ROUTES.PORTFOLIO && (
          <IconButton
            edge="start"
            className={classes.icon}
            color="inherit"
            aria-label="back"
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <PieChartIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Portfolio builder
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
