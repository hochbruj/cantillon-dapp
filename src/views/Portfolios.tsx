import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Portfolio } from "../sharedTypes/portfolios";
import { formatPercentage } from "../utilities/formatters";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { useStore } from "../store/store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  link: {
    textDecoration: "none",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
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
}));

interface CardsRaised {
  [key: string]: boolean;
}

const Portfolios = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useStore();
  const { portfolios, balances, connectedWeb3 } = state;

  const [cardStates, setCardState] = useState<CardsRaised | null>(null);

  useEffect(() => {
    if (portfolios) {
      const initialCardStates: CardsRaised = portfolios!.reduce(
        (obj, item) => ({
          ...obj,
          [item.id]: false,
        }),
        {}
      );
      setCardState(initialCardStates);
    }
  }, [portfolios]);

  useEffect(() => {
    if (state.user?.portfolioId) {
      history.push(ROUTES.DASHBOARD);
    }
  });

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Portfolio allocation models
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            These allocation models can help you understand different
            goals-based investment strategies. There's no right or wrong model,
            so it's important to tune in to what you feel best fits your goals
            and risk tolerance.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {portfolios && cardStates ? (
          <Grid container spacing={4}>
            {portfolios
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((portfolio: Portfolio) => (
                <Grid item key={portfolio.id} xs={12} sm={6} md={4}>
                  <Link
                    to={{
                      pathname: ROUTES.PORTFOLIO,
                      state: {
                        portfolio,
                      },
                    }}
                    className={classes.link}
                  >
                    <Card
                      className={classes.card}
                      classes={{
                        root: cardStates[portfolio.id]
                          ? classes.cardHovered
                          : "",
                      }}
                      onMouseOver={() =>
                        setCardState({
                          ...cardStates,
                          [portfolio.id]: true,
                        })
                      }
                      onMouseOut={() =>
                        setCardState({
                          ...cardStates,
                          [portfolio.id]: false,
                        })
                      }
                      raised={cardStates[portfolio.id]}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={`/images/Portfolio_${portfolio.id}.jpg`}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {portfolio.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="h2"
                          className={classes.bold}
                        >
                          Historical Risk/Return ({portfolio.historyYears}{" "}
                          years)
                        </Typography>
                        <Grid container>
                          <Grid item xs={8}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="left"
                            >
                              Average annual return
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="right"
                            >
                              {formatPercentage(
                                portfolio.yearlyReturns[portfolio.historyYears]
                                  .apy,
                                false
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="left"
                            >
                              Best 12 months
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="right"
                            >
                              {formatPercentage(
                                portfolio.yearlyReturns[portfolio.historyYears]
                                  .best12Months,
                                false
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="left"
                            >
                              Worst 12 months
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              component="h2"
                              align="right"
                            >
                              {formatPercentage(
                                portfolio.yearlyReturns[portfolio.historyYears]
                                  .worst12Months,
                                false
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        ) : (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        )}
      </Container>
    </main>
  );
};
export default Portfolios;
