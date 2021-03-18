import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { Portfolio } from "../sharedTypes/portfolios";
import { Balances, TradeAmounts } from "../sharedTypes/eth.types";
import { tokens } from "../config/ethData";
import BigNumber from "bignumber.js";

export const useTradeAmounts = (portfolio: Portfolio) => {
  const { state } = useStore();
  const { balances } = state;
  const assets = Object.keys(tokens).filter((token) => token !== "ETH");
  //amounts in wei per Token to purchased
  const [tradeAmounts, setTradeAmounts] = useState({} as TradeAmounts);

  useEffect(() => {
    if (balances && portfolio) {
      assets.forEach(
        (token) =>
          (tradeAmounts[token] = new BigNumber(balances.ETH)
            .times(portfolio.weights[token])
            .toFixed(0))
      );
      setTradeAmounts(tradeAmounts);
    }
  }, [portfolio, balances]);

  return tradeAmounts;
};
