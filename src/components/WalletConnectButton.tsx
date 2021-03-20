import { FC, useState, useEffect, useRef } from "react";
import {
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  CircularProgress,
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
import { networks } from "../config/ethData";
import { capitalize } from "../utilities/formatters";

const useStyles = makeStyles((theme) => ({
  connectIcon: {
    color: "#81c784",
  },
  walletButton: {
    textTransform: "none",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: "#81c784",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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
  const { balances } = state;
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (balances) {
      setLoading(false);
    }
  }, [balances]);

  const connetWallet = async () => {
    setLoading(true);
    try {
      const provider = await web3ModalInstance.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const networkId = await web3.eth.net.getId();
      const wallet = "Metamask";
      const connectedWeb3: ConnectedWeb3 = {
        web3,
        account,
        network: networks[networkId],
        wallet,
      };
      dispatch({ type: "connectWeb3", connectedWeb3 });
      setOpen(false);
    } catch (e) {
      setLoading(false);
    }
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
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="secondary"
        onClick={connetWallet}
        disabled={loading}
      >
        Connect Wallet
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default WalletConnectButton;
