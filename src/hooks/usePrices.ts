import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { TokenAmounts } from "../sharedTypes/eth.types";
import { getPrices } from "../services/getPrices";

export const usePrices = () => {
  const { dispatch } = useStore();
  const [updatePrices, setUpdatePrices] = useState(false);

  useEffect(() => {
    async function updatePrices() {
      let prices = {} as TokenAmounts;
      prices = await getPrices();
      dispatch({ type: "updatePrices", prices });
    }
    if (updatePrices) {
      updatePrices();
      setUpdatePrices(false);
    }
  }, [updatePrices]);
  return setUpdatePrices;
};
