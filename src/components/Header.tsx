import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  PaletteType,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes";
import ThemeButton from "./ThemeButton";
import { FC, useState } from "react";
import WalletConnectButton from "./WalletConnectButton";
import WalletButton from "./WalletButton";
import { useStore } from "../store/store";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  logo: {
    maxWidth: 60,
    marginLeft: theme.spacing(2),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

interface HeaderProps {
  setTheme: (theme: PaletteType) => void;
  theme: PaletteType;
}

const Header: FC<HeaderProps> = ({ setTheme, theme }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { state } = useStore();
  const { balances, connectedWeb3 } = state;

  return (
    <AppBar position="static">
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
        <Typography align="left" variant="h4" color="inherit" noWrap>
          Cantillon
        </Typography>
        {/* <img alt="Logo" className={classes.logo} src="/images/Logo.png" /> */}
        <div className={classes.flexGrow} />
        {connectedWeb3 && balances ? <WalletButton /> : <WalletConnectButton />}
        <ThemeButton setTheme={setTheme} theme={theme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
