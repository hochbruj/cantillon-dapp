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

interface PurchaseButtonProps {
  txInput: any;
  portfolioBalancer: any;
}

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

const PurchaseButton: FC<PurchaseButtonProps> = ({
  txInput,
  portfolioBalancer,
}) => {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [loading, setLoading] = useState(false);

  const purchaseAssets = async () => {
    setLoading(true);
    try {
      const result = portfolioBalancer.methods
        .rebalance(txInput[0], txInput[1], txInput[2])
        .send({ from: connectedWeb3!.account, value: txInput[3] });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="secondary"
        onClick={purchaseAssets}
        disabled={loading}
      >
        Purchase assets
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default PurchaseButton;
