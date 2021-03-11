import axios from "axios";
import { Portfolio } from "../sharedTypes/portfolios";
import { backendUrl } from "../config/apis";

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const result = await axios.get(`${backendUrl}portfolios`);
  return result.data;
};
