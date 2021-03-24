import { FC, useState, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import { makeStyles } from "@material-ui/core/styles";
import { useStore, ConnectedWeb3 } from "../store/store";
import { networks } from "../config/ethData";

const useStyles = makeStyles((theme) => ({
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
