import { FC, useEffect, useState } from "react";
import { useBalances } from "../hooks/useBalances";
import { useStore } from "../store/store";
import { usePrices } from "../hooks/usePrices";
import { getPortfolios } from "../services/getPortfolios";

const Web3Data: FC = () => {
  const { state, dispatch } = useStore();
  const setUpdatePrices = usePrices();
  const [account, setAccount] = useState<string>("");

  //initial rendering
  useEffect(() => {
    const loadPortfolios = async () => {
      const portfolios = await getPortfolios();
      dispatch({ type: "loadPortfolios", portfolios });
    };
    setUpdatePrices(true);
    loadPortfolios();
  }, []);

  useEffect(() => {
    setUpdatePrices(true);
    dispatch({ type: "updateAccount", account });
  }, [account]);

  window.ethereum.on("accountsChanged", function (accounts: any) {
    setAccount(accounts[0]);
  });

  useBalances(account);

  console.log("state", state);

  return <div></div>;
};

export default Web3Data;
