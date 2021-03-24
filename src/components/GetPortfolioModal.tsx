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
  CircularProgress,
} from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { Portfolio } from "../sharedTypes/portfolios";
import { Token, TokenAmounts, UniswapAmounts } from "../sharedTypes/eth.types";
import { contractsAddressesMap, tokens } from "../config/ethData";
import { useUniswap } from "../hooks/useUniswap";
import { useStore } from "../store/store";
import { formatToUsd, native } from "../utilities/formatters";
import BigNumber from "bignumber.js";
import PortfolioBalancerV2 from "../contracts/PortfolioBalancerV2.json";
import { getGasPrices } from "../services/getGasPrices";
import { totalUsdBalance } from "../utilities/calculations";
//import { usePrices } from "../hooks/usePrices";

const useStyles = makeStyles((theme) => ({
  assetAllocation: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  assetAllolcationTitle: {
    paddingLeft: theme.spacing(2),
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
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(10),
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
  const { state, dispatch } = useStore();
  const { prices, balances, connectedWeb3 } = state;
  const { web3, account, network } = connectedWeb3!;
  const [ethFee, setEthFee] = useState<string | null>(null);
  //const setUpdatePrices = usePrices();

  const assets = Object.keys(tokens).filter(
    (token) => portfolio.weights[token] > 0 && token !== "ETH"
  ) as [Token];

  let tradeAmounts = {} as TokenAmounts;
  assets.forEach(
    (token) =>
      (tradeAmounts[token] = new BigNumber(balances!.ETH)
        .times(portfolio.weights[token])
        .toFixed(0))
  );

  const { uniswapAmounts, setUpdateUniswap } = useUniswap(tradeAmounts);

  const slippage = (
    ethAmount: string,
    ethPrice: string,
    tokenAmount: string,
    tokenPrice: string
  ): number => {
    return (
      Number(tokenAmount) * Number(tokenPrice) -
      (Number(ethAmount) / 1e18) * Number(ethPrice)
    );
  };

  const totalSlippage = (
    tradeAmounts: TokenAmounts,
    uniswapAmounts: UniswapAmounts,
    prices: TokenAmounts,
    ethFee: string
  ): number => {
    let coinSlippages = 0;
    assets.forEach((token) => {
      coinSlippages += slippage(
        tradeAmounts[token],
        prices.ETH,
        uniswapAmounts[token].amountOutMin,
        prices[token]
      );
    });
    return coinSlippages - Number(ethFee);
  };

  const portfolioBalancer = new web3.eth.Contract(
    PortfolioBalancerV2.abi as any,
    contractsAddressesMap[network].PortfolioBalancer
  );

  const txInput = () => {
    const tokenAddresses = assets.map(
      (token) => contractsAddressesMap[network][native(token)]
    );
    const inputAmounts = assets.map((token) => tradeAmounts[token]);
    const minOutAmounts = assets.map(
      (token) => uniswapAmounts![token].amountOutMinRaw
    );

    const totalAmountETH = inputAmounts.reduce(
      (a, b) => Number(a) + Number(b),
      0
    );

    return [
      tokenAddresses,
      inputAmounts,
      minOutAmounts,
      totalAmountETH.toFixed(0),
    ];
  };

  // const sleep = (ms: number) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // };

  useEffect(() => {
    // async function performUpdates() {
    //   setUpdateUniswap(true);
    //   await sleep(30000);
    //   console.log("updating prices from comp");
    //   setUpdatePrices(true);
    // }
    // performUpdates();
    setUpdateUniswap(true);
  });

  useEffect(() => {
    const estimateFees = async () => {
      const inputs = txInput();
      try {
        const gasFeeResults = Promise.all([
          portfolioBalancer.methods
            .rebalance(inputs[0], inputs[1], inputs[2])
            .estimateGas({ from: account, value: inputs[3] }),
          getGasPrices(),
        ]);
        const [gasfee, gasprices] = await gasFeeResults;
        setEthFee(
          new BigNumber(gasfee)
            .times(gasprices.standard)
            .dividedBy(1e20)
            .times(prices!.ETH)
            .toString()
        );
      } catch (e) {
        console.log(e);
      }
    };
    if (uniswapAmounts && prices) {
      estimateFees();
    }
  }, [uniswapAmounts, prices]);

  return (
    <Dialog open={open} onClose={() => setModalOpen(false)}>
      {uniswapAmounts && prices && ethFee ? (
        <>
          <DialogTitle id="simple-dialog-title">{`Investment amount: ${formatToUsd(
            totalUsdBalance(balances!, prices)
          )}`}</DialogTitle>
          <div className={classes.assetAllocation}>
            <Typography className={classes.assetAllolcationTitle}>
              Asset purchases
            </Typography>
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
                    <TableCell align="right">
                      {uniswapAmounts[token].amountOutMin}
                    </TableCell>
                    <TableCell>
                      {formatToUsd(
                        Number(uniswapAmounts[token].amountOutMin) *
                          Number(prices[token])
                      )}
                    </TableCell>
                    <TableCell>
                      {formatToUsd(
                        slippage(
                          tradeAmounts[token],
                          prices.ETH,
                          uniswapAmounts[token].amountOutMin,
                          prices[token]
                        )
                      )}
                    </TableCell>
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
                  {formatToUsd(Number(ethFee))}
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
                  {formatToUsd(
                    totalSlippage(tradeAmounts, uniswapAmounts, prices, ethFee)
                  )}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress size={24} />
        </div>
      )}
    </Dialog>
  );
};

export default GetPortfolioModal;
