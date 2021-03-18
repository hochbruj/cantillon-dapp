import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { FC } from "react";
import { Portfolio } from "../sharedTypes/portfolios";
import { Token } from "../sharedTypes/eth.types";
import { tokens } from "../config/ethData";
import { useTradeAmounts } from "../hooks/useTradeAmounts";
import { useUniswap } from "../hooks/useUniswap";

const useStyles = makeStyles((theme) => ({
  assetAllocation: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  feeInfo: {
    padding: theme.spacing(4),
  },
  tokenContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
    height: 32,
    width: 32,
  },
}));

interface GetPortfolioModalProps {
  open: boolean;
  portfolio: Portfolio;
  setModalOpen: (modalOpen: boolean) => void;
}

const GetPortfolioModal: FC<GetPortfolioModalProps> = ({
  open,
  setModalOpen,
  portfolio,
}) => {
  const classes = useStyles();
  const assets = Object.keys(tokens).filter(
    (token) => portfolio.weights[token] > 0 && token !== "ETH"
  );

  const tradeAmounts = useTradeAmounts(portfolio);
  console.log("trade amounts", tradeAmounts);
  const uniswapAmounts = useUniswap(tradeAmounts);
  console.log("uniswap amounts", uniswapAmounts);

  return (
    <Dialog open={open} onClose={() => setModalOpen(false)}>
      <DialogTitle id="simple-dialog-title">{`${portfolio.name} portfolio asset purchases`}</DialogTitle>
      <div className={classes.assetAllocation}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Slippage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((token) => (
              <TableRow key={token}>
                <TableCell>
                  <div className={classes.tokenContainer}>
                    <img
                      className={classes.avatar}
                      src={`/tokens/${token}.png`}
                    />
                    <Typography variant="body1">{token}</Typography>
                  </div>
                </TableCell>
                <TableCell>10000</TableCell>
                <TableCell>10000</TableCell>
                <TableCell>10000</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={classes.feeInfo}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="body1" component="h2" align="left">
              Ethereum network fee
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="h2" align="right">
              $123
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={8}>
            <Typography variant="body1" component="h2" align="left">
              Total slippage
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="h2" align="right">
              $6868 (8.7%)
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

export default GetPortfolioModal;
