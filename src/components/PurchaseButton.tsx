import { FC, useState, useEffect, useRef } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStore, Message } from "../store/store";
import { networks } from "../config/ethData";
import { useBalances } from "../hooks/useBalances";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../config/routes";

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
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const setUpdateBalance = useBalances(connectedWeb3!.account);

  const purchaseAssets = async () => {
    setLoading(true);
    try {
      const result = await portfolioBalancer.methods
        .rebalance(txInput[0], txInput[1], txInput[2])
        .send({
          from: connectedWeb3!.account,
          value: txInput[3],
          gas: "700000",
          gasPrice: "1000000000",
        });
      setUpdateBalance(true);
      const message = {
        type: "success",
        text: "Congratulation! You successfully purchased the portfolio!",
      } as Message;
      dispatch({ type: "updateMessage", message });
      history.push(ROUTES.DASHBOARD);
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
