import axios from "axios";
import { Portfolio } from "../../sharedTypes/portfolios";
import { backendUrl } from "../../config/apis";

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const result = await axios.get(`${backendUrl}portfolios`);

  //hack because we use PAXG on mainnet
  if (process.env.REACT_APP_ETHEREUM_NETWORK === "mainnet")
    result.data.forEach((e: Portfolio) => {
      e.weights["PAXG"] = e.weights["PMGT"];
      e.weights["PMGT"] = 0;
    });

  return result.data;
};
