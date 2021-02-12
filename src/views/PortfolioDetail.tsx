import { useEffect } from "react";
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
} from "@material-ui/core";
import Calculator from "../components/Calculator";
import { makeStyles } from "@material-ui/core/styles";
import { Portfolio, Weights } from "../sharedTypes/portfolios";
import { Token } from "../sharedTypes/tokens";
import { useLocation } from "react-router-dom";
import { formatPercentage } from "../utilities/formatters";

const tokens: [Token] = require("../config/tokens.json");

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
  const { state } = useLocation<PortfolioDetailState>();
  const { portfolio } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <div className={classes.tokenContainer}>
                      <img
                        className={classes.avatar}
                        src={`/tokens/${token.id}.png`}
                      />
                      <Typography variant="body1">{token.id}</Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Link href={token.link} target="_blank">
                      {token.name}
                    </Link>
                  </TableCell>
                  <TableCell>{token.assetClass}</TableCell>
                  <TableCell align="right">
                    {formatPercentage(
                      portfolio.weights[token.id as keyof Weights]
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
    </main>
  );
};

export default PortfolioDetail;
