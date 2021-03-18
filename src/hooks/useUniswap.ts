import { useEffect, useState } from "react";
import {
  ChainId,
  WETH,
  Token as UniToken,
  Trade,
  TokenAmount,
  Fetcher,
  Route,
  TradeType,
} from "@uniswap/sdk";
import { useStore } from "../store/store";
import { Token, TradeAmounts, UniswapAmounts } from "../sharedTypes/eth.types";
import { contractsAddressesMap, tokens } from "../config/ethData";
import { native } from "../utilities/formatters";

export const useUniswap = (tradeAmounts: TradeAmounts) => {
  const { state } = useStore();
  const { connectedWeb3 } = state;
  const [uniswapAmounts, setUniswapAmounts] = useState({} as UniswapAmounts);

  useEffect(() => {
    async function getUniswap() {
      const chainId: ChainId = await connectedWeb3!.web3.eth.net.getId();
      const { network } = connectedWeb3!;
      const assets = Object.keys(tokens).filter(
        (token) => token !== "ETH" && tradeAmounts[token] !== "0"
      ) as [Token];

      const tokenPromises = Promise.all(
        assets.map((token) =>
          Fetcher.fetchTokenData(
            chainId,
            contractsAddressesMap[network][native(token)]
          )
        )
      );
      const uniTokens: UniToken[] = await tokenPromises;

      const pairPromises = Promise.all(
        uniTokens.map((token) => Fetcher.fetchPairData(token, WETH[chainId]))
      );
      const pairs = await pairPromises;
      const routes = pairs.map((pair) => new Route([pair], WETH[chainId]));

      let i = 0;
      for (const token of assets) {
        const trade = new Trade(
          routes[i],
          new TokenAmount(WETH[chainId], tradeAmounts[token]),
          TradeType.EXACT_INPUT
        );
        uniswapAmounts[token] = trade.executionPrice.toSignificant(6);
        i++;
      }
    }
    if (connectedWeb3 && tradeAmounts) {
      getUniswap();
    }
  }, [connectedWeb3, tradeAmounts]);
  return uniswapAmounts;
};
