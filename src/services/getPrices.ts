import axios from "axios";
import { priceUrl } from "../config/apis";
import { tokens } from "../config/ethData";
import {
  HistorcialPrices,
  Token,
  TokenAmounts,
} from "../sharedTypes/eth.types";

export const getPrices = async (): Promise<TokenAmounts> => {
  const tokenList = Object.keys(tokens) as [Token];
  let prices = {} as TokenAmounts;
  const coingeckoIds = tokenList.map((x) => tokens[x].coingeckoId).join("%2C");
  const url = `${priceUrl}simple/price?ids=${coingeckoIds}&vs_currencies=usd`;
  const result = await axios.get(url);
  for (const token of tokenList) {
    //hack for kovan
    if (token === "ETH") {
      prices[token] = (
        result.data[tokens[token].coingeckoId]["usd"] * 100
      ).toString();
    } else {
      prices[token] = result.data[tokens[token].coingeckoId]["usd"];
    }
  }
  return prices;
};

export const getHistoricalPrices = async (): Promise<HistorcialPrices> => {
  const tokenList = Object.keys(tokens) as [Token];
  let prices = {} as HistorcialPrices;
  const days = 2;
  try {
    const resultArray = await Promise.all(
      tokenList.map((token) =>
        axios(
          `${priceUrl}/coins/${tokens[token].coingeckoId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
      )
    );
    const priceArray = resultArray.map((result) => result.data.prices);

    let i = 0;
    for (const token of tokenList) {
      if (token === "ETH") {
        prices[token] = priceArray[i].map((e: any[]) => e[1] * 100);
      } else {
        prices[token] = priceArray[i].map((e: any[]) => e[1]);
      }
      i++;
    }
  } catch (e) {
    console.log("error coingecko api", e);
  }
  return prices;
};
