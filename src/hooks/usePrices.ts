import { useEffect } from "react";
import { useStore } from "../store/store";
import { TokenAmounts } from "../sharedTypes/eth.types";
import { getPrices } from "../services/getPrices";

export const usePrices = () => {
  const { dispatch } = useStore();

  useEffect(() => {
    async function updatePrices() {
      let prices = {} as TokenAmounts;
      prices = await getPrices();
      dispatch({ type: "updatePrices", prices });
    }
    updatePrices();
  }, []);
};
