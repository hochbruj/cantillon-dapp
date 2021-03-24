import axios from "axios";
import { priceUrl } from "../config/apis";
import { tokens } from "../config/ethData";
import { Token, TokenAmounts } from "../sharedTypes/eth.types";

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
