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
  Percent,
} from "@uniswap/sdk";
import { useStore } from "../store/store";
import { Token, TokenAmounts, UniswapAmounts } from "../sharedTypes/eth.types";
import { contractsAddressesMap, tokens } from "../config/ethData";
import { native } from "../utilities/formatters";

export const useUniswap = (tradeAmounts: TokenAmounts) => {
  const { state } = useStore();
  const { connectedWeb3 } = state;
  const [uniswapAmounts, setUniswapAmounts] = useState<UniswapAmounts | null>();
  const [updateUniswap, setUpdateUniswap] = useState(false);

  useEffect(() => {
    async function getUniswap() {
      let amounts = {} as UniswapAmounts;
      const chainId: ChainId = await connectedWeb3!.web3.eth.net.getId();
      const { network } = connectedWeb3!;
      const assets = Object.keys(tokens).filter(
        (token) => token !== "ETH" && tradeAmounts[token as Token]
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

        const slippageTolerance = new Percent("50", "10000");
        amounts[token] = {
          executionPrice: trade.executionPrice.toSignificant(6),
          amountOutMin: trade
            .minimumAmountOut(slippageTolerance)
            .toSignificant(6),
          amountOutMinRaw: "0",
        };

        i++;
      }
      setUniswapAmounts(amounts);
    }
    if (updateUniswap) {
      getUniswap();
      setUpdateUniswap(false);
    }
  }, [updateUniswap]);
  return { uniswapAmounts, setUpdateUniswap };
};
