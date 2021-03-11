import axios from "axios";
import { priceUrl } from "../config/apis";
import { tokens } from "../config/ethData";
import { Token } from "../sharedTypes/eth.types";

export const getPrices = async () => {
  const tokenList = Object.keys(tokens) as [Token];
  const coingeckoIds = tokenList.map((x) => tokens[x].coingeckoId).join("%2C");
  const url = `${priceUrl}simple/price?ids=${coingeckoIds}&vs_currencies=usd`;
  try {
    const result = await axios.get(url);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
