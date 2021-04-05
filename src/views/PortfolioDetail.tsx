import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Card,
  CardMedia,
  TableBody,
  Link,
  Button,
} from "@material-ui/core";
import Calculator from "../components/Calculator";
import { makeStyles } from "@material-ui/core/styles";
import { Portfolio, Weights } from "../sharedTypes/portfolios";
import { Token } from "../sharedTypes/eth.types";
import { useLocation } from "react-router-dom";
import { formatPercentage } from "../utilities/formatters";
import GetPortfolioModal from "../components/GetPortfolioModal";

import { tokens } from "../config/ethData";
import { Message, useStore } from "../store/store";
import WalletConnectButton from "../components/WalletConnectButton";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  assetAllocation: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  overview: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: 600,
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
  margin: {
    margin: theme.spacing(1),
  },
}));

interface PortfolioDetailState {
  portfolio: Portfolio;
}

const PortfolioDetail = () => {
  const classes = useStyles();
  const location = useLocation<PortfolioDetailState>();
  const { portfolio } = location.state;
  const { state, dispatch } = useStore();
  const { connectedWeb3, balances } = state;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handeleGetPortfolio = () => {
    if (balances?.ETH === "0") {
      const message = {
        type: "error",
        text:
          "Youn need to fund your wallet with ETH before you can get this portfolio",
      } as Message;
      dispatch({ type: "updateMessage", message });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Grid container spacing={4} direction="row" alignItems="center">
            <Grid container item xs={6}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {portfolio.name} Portfolio
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardMedia
                  className={classes.cardMedia}
                  image={`/images/Portfolio_${portfolio.id}.jpg`}
                  title="Image title"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container className={classes.overview} maxWidth="md">
        {/* End hero unit */}
        <Typography
          component="h2"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          Portfolio overview
        </Typography>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {portfolio.description}
        </Typography>
      </Container>
      <div className={classes.assetAllocation}>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h4"
            color="textPrimary"
            gutterBottom
          >
            Asset allocation
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Asset class</TableCell>
                <TableCell align="right">Allocation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(tokens).map((token: string) => (
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
                  <TableCell>
                    {" "}
                    <Link href={tokens[token as Token].link} target="_blank">
                      {tokens[token as Token].name}
                    </Link>
                  </TableCell>
                  <TableCell>{tokens[token as Token].assetClass}</TableCell>
                  <TableCell align="right">
                    {formatPercentage(
                      portfolio.weights[token as keyof Weights]
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </div>
      <Container className={classes.overview} maxWidth="md">
        {/* End hero unit */}
        <Typography
          component="h2"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          Performance
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>1 Year</TableCell>
              <TableCell>3 Years</TableCell>
              <TableCell>5 Years</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total Return</TableCell>
              <TableCell>
                {formatPercentage(portfolio.year1.totalReturn)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year3.totalReturn)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year5.totalReturn)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Annualized Return (APY)</TableCell>
              <TableCell>{formatPercentage(portfolio.year1.apy)}</TableCell>
              <TableCell>{formatPercentage(portfolio.year3.apy)}</TableCell>
              <TableCell>{formatPercentage(portfolio.year5.apy)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Best 12 months</TableCell>
              <TableCell>
                {formatPercentage(portfolio.year1.best12Months)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year3.best12Months)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year5.best12Months)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Worst 12 months</TableCell>
              <TableCell>
                {formatPercentage(portfolio.year1.worst12Months)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year3.worst12Months)}
              </TableCell>
              <TableCell>
                {formatPercentage(portfolio.year5.worst12Months)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <Calculator portfolio={portfolio} />
      <Container className={classes.overview} maxWidth="md">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {connectedWeb3 && balances ? (
            <>
              <Grid item xs={12}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handeleGetPortfolio}
                >
                  Get this portfolio
                </Button>
              </Grid>
              {balances.ETH !== "0" && (
                <GetPortfolioModal
                  open={modalOpen}
                  setModalOpen={setModalOpen}
                  portfolio={portfolio}
                />
              )}
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography>
                  Please connect a wallet, if you want to get this portfolio{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <WalletConnectButton />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default PortfolioDetail;
