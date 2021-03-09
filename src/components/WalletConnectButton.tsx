import { FC, useState, useEffect, useRef } from "react";
import {
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import copy from "copy-to-clipboard";
import { makeStyles } from "@material-ui/core/styles";
import { useStore, ConnectedWeb3 } from "../store/store";
import { abbreviateAddress } from "../utilities/formatters";

const useStyles = makeStyles((theme) => ({
  connectIcon: {
    color: "#81c784",
  },
  walletButton: {
    textTransform: "none",
  },
  copyIcon: {
    marginLeft: theme.spacing(1),
  },
  menuItemNetwork: {
    borderBottom: "1px solid #d3d4d5",
    width: 400,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: theme.palette.background.paper,
      cursor: "default",
    },
  },
  menuItemAddress: {
    borderBottom: "1px solid #d3d4d5",
    width: 400,
    whiteSpace: "unset",
    wordBreak: "break-all",
    paddingRight: theme.spacing(10),
  },
}));

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.REACT_APP_FORTMATIC_ID,
    },
  },
  portis: {
    package: Portis,
    options: {
      id: process.env.REACT_APP_PORTIS_ID,
    },
  },
};

const web3ModalOptions = {
  cacheProvider: false,
  providerOptions,
};

const web3ModalInstance = new Web3Modal(web3ModalOptions);

const WalletConnectButton: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const connetWallet = async () => {
    const provider = await web3ModalInstance.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const network = "main";
    const wallet = "Metamask";
    const connectedWeb3: ConnectedWeb3 = {
      web3,
      account,
      network,
      wallet,
    };
    dispatch({ type: "connectWeb3", connectedWeb3 });
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const disconnectWallet = () => {
    dispatch({ type: "disconnectWeb3" });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (anchorRef.current) {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {state.connectedWeb3 ? (
        <div>
          <Button
            variant="contained"
            ref={anchorRef}
            href="#"
            color="secondary"
            onClick={handleToggle}
            className={classes.walletButton}
            startIcon={
              <FiberManualRecordIcon className={classes.connectIcon} />
            }
          >
            {abbreviateAddress(state.connectedWeb3.account)}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      <MenuItem className={classes.menuItemNetwork}>
                        <FiberManualRecordIcon
                          className={classes.connectIcon}
                        />
                        Mainnet Ethereum Network
                      </MenuItem>
                      <MenuItem
                        className={classes.menuItemAddress}
                        onClick={() => copy(state.connectedWeb3!.account)}
                      >
                        {state.connectedWeb3!.account}
                        <FileCopyIcon className={classes.copyIcon} />
                      </MenuItem>
                      <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      ) : (
        <Button variant="contained" color="secondary" onClick={connetWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnectButton;
