import axios from "axios";
import { gasPriceUrl } from "../../config/apis";
import { GasPrices } from "../../sharedTypes/eth.types";

export const getGasPrices = async (): Promise<GasPrices> => {
  let gasPrices = {} as GasPrices;
  const result = await axios.get(gasPriceUrl);
  gasPrices.slow = result.data.data["slow"];
  gasPrices.standard = result.data.data["standard"];
  gasPrices.fast = result.data.data["fast"];
  return gasPrices;
};
