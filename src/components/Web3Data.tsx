import { FC, useEffect } from "react";
import { useBalances } from "../hooks/useBalances";
import { useStore } from "../store/store";
import { usePrices } from "../hooks/usePrices";

const Web3Data: FC = () => {
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;
  const setUpdatePrices = usePrices();

  //initial rendering
  useEffect(() => {
    setUpdatePrices(true);
  }, []);

  useBalances();

  window.ethereum.on("accountsChanged", function (accounts: any) {
    if (connectedWeb3 && connectedWeb3.account !== accounts[0]) {
      dispatch({ type: "updateAccount", account: accounts[0] });
    }
  });

  console.log("state", state);

  return <div></div>;
};

export default Web3Data;
