import axios from "axios";
import { Portfolio } from "../sharedTypes/portfolios";

const url =
  "https://us-central1-fabled-plating-300422.cloudfunctions.net/portfolios";

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const result = await axios.get(url);
  return result.data;
};
