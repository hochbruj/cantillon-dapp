import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { getHistoricalPrices } from "../services/getPrices";

export const usePrices = () => {
  const { dispatch } = useStore();
  const [updatePrices, setUpdatePrices] = useState(false);

  useEffect(() => {
    async function updatePrices() {
      //const prices = await getPrices();
      const prices = await getHistoricalPrices();

      dispatch({ type: "updatePrices", prices });
    }
    if (updatePrices) {
      updatePrices();
      setUpdatePrices(false);
    }
  }, [updatePrices]);
  return setUpdatePrices;
};
