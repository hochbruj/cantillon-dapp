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
      year1Balance: formatAmount((portfolio.year1.totalReturn + 1) * amount),
      year3Balance: formatAmount((portfolio.year3.totalReturn + 1) * amount),
      year5Balance: formatAmount((portfolio.year5.totalReturn + 1) * amount),
      year1Loss: formatAmount(portfolio.year1.worstReturn * amount * -1),
      year3Loss: formatAmount(portfolio.year3.worstReturn * amount * -1),
      year5Loss: formatAmount(portfolio.year5.worstReturn * amount * -1),
    };
  };

  const [amounts, setAmounts] = useState<Amounts>(getAmounts(initalAmount));
  const [inputAmount, setInputAmount] = useState<number>(initalAmount);

  const handleChange = (event: any) => {
    console.log("setting", event);
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
              <TableCell>{amounts.year3Balance}</TableCell>
              <TableCell>{amounts.year5Balance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Maximum loss during period</TableCell>
              <TableCell>{amounts.year1Loss}</TableCell>
              <TableCell>{amounts.year3Loss}</TableCell>
              <TableCell>{amounts.year5Loss}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default Calculator;
