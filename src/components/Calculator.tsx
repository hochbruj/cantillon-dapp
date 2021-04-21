import { FC, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatAmount } from "../utilities/formatters";
import { Portfolio } from "../sharedTypes/portfolios";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

interface CalculatorProps {
  portfolio: Portfolio;
}

interface Amounts {
  year1Balance: string;
  year3Balance: string;
  year5Balance: string;
  year1Loss: string;
  year3Loss: string;
  year5Loss: string;
}

const Calculator: FC<CalculatorProps> = ({ portfolio }) => {
  const classes = useStyles();
  const initalAmount = 10000;

  const getAmounts = (amount: number): Amounts => {
    return {
      year1Balance: formatAmount(
        (portfolio.yearlyReturns[1].totalReturn + 1) * amount
      ),
      year3Balance: formatAmount(
        (portfolio.yearlyReturns[3].totalReturn + 1) * amount
      ),
      year5Balance: formatAmount(
        (portfolio.yearlyReturns[5].totalReturn + 1) * amount
      ),
      year1Loss: formatAmount(
        portfolio.yearlyReturns[1].worstReturn * amount * -1
      ),
      year3Loss: formatAmount(
        portfolio.yearlyReturns[3].worstReturn * amount * -1
      ),
      year5Loss: formatAmount(
        portfolio.yearlyReturns[5].worstReturn * amount * -1
      ),
    };
  };

  const [amounts, setAmounts] = useState<Amounts>(getAmounts(initalAmount));
  const [inputAmount, setInputAmount] = useState<number>(initalAmount);

  const handleChange = (event: any) => {
    setAmounts(getAmounts(event.target.value));
    setInputAmount(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        {/* End hero unit */}
        <Typography
          component="h2"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          Calculator
        </Typography>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={inputAmount}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Invested 1 year ago</TableCell>
              <TableCell>Invested 3 years ago</TableCell>
              <TableCell>Invested 5 years ago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Investment balance today</TableCell>
              <TableCell>{amounts.year1Balance}</TableCell>
              <TableCell>
                {portfolio.historyYears >= 3 ? amounts.year3Balance : "N/A"}
              </TableCell>
              <TableCell>
                {portfolio.historyYears >= 5 ? amounts.year5Balance : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Maximum loss during period</TableCell>
              <TableCell>{amounts.year1Loss}</TableCell>
              <TableCell>
                {portfolio.historyYears >= 3 ? amounts.year3Loss : "N/A"}
              </TableCell>
              <TableCell>
                {portfolio.historyYears >= 5 ? amounts.year5Loss : "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default Calculator;
