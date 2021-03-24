import { Token, TokenAmounts } from "../sharedTypes/eth.types";
import { tokens } from "../config/ethData";
import BigNumber from "bignumber.js";

export const totalUsdBalance = (
  balances: TokenAmounts,
  prices: TokenAmounts
): number => {
  let totalAmount = new BigNumber(0);
  const tokenList = Object.keys(tokens) as Token[];
  tokenList.forEach((token) => {
    totalAmount = totalAmount.plus(
      new BigNumber(balances[token])
        .dividedBy(10 ** tokens[token].decimals)
        .multipliedBy(prices[token])
    );
  });
  return totalAmount.toNumber();
};
