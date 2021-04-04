import {
  HistorcialPrices,
  Token,
  TokenAmounts,
} from "../sharedTypes/eth.types";
import { tokens } from "../config/ethData";
import BigNumber from "bignumber.js";

export const totalUsdBalance = (
  balances: TokenAmounts,
  prices: HistorcialPrices
): number => {
  let totalAmount = new BigNumber(0);
  const tokenList = Object.keys(tokens) as Token[];
  tokenList.forEach((token) => {
    totalAmount = totalAmount.plus(
      new BigNumber(balances[token])
        .dividedBy(10 ** tokens[token].decimals)
        .multipliedBy(currentPrice(prices, token))
    );
  });
  return totalAmount.toNumber();
};

export const dailyDelta = (
  balances: TokenAmounts,
  prices: HistorcialPrices
): number => {
  let totalAmountYesterday = new BigNumber(0);
  const tokenList = Object.keys(tokens) as Token[];
  tokenList.forEach((token) => {
    totalAmountYesterday = totalAmountYesterday.plus(
      new BigNumber(balances[token])
        .dividedBy(10 ** tokens[token].decimals)
        .multipliedBy(prices[token][0])
    );
  });
  return totalUsdBalance(balances, prices) - totalAmountYesterday.toNumber();
};

export const normalized = (value: string, token: Token): string => {
  return new BigNumber(value)
    .dividedBy(10 ** tokens[token].decimals)
    .toFixed(4);
};

export const currentPrice = (
  prices: HistorcialPrices,
  token: Token
): number => {
  return prices[token][prices[token].length - 1];
};
