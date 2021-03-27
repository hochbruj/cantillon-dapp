import { FC, useEffect, useState } from "react";
import { useBalances } from "../hooks/useBalances";
import { useStore } from "../store/store";
import { usePrices } from "../hooks/usePrices";

const Web3Data: FC = () => {
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;
  const setUpdatePrices = usePrices();
  const [account, setAccount] = useState<string>("");

  //initial rendering
  useEffect(() => {
    setUpdatePrices(true);
  }, []);

  useEffect(() => {
    setUpdatePrices(true);
    dispatch({ type: "updateAccount", account });
  }, [account]);

  window.ethereum.on("accountsChanged", function (accounts: any) {
    // console.log("chgecking account");
    // if (connectedWeb3 && connectedWeb3.account !== accounts[0]) {
    //   console.log("updating account account");
    //   dispatch({ type: "updateAccount", account: accounts[0] });
    // }
    setAccount(accounts[0]);
  });

  useBalances(account);

  console.log("state", state);

  return <div></div>;
};

export default Web3Data;
