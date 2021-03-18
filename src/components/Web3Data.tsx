import { FC } from "react";
import { useBalances } from "../hooks/useBalances";
import { useStore } from "../store/store";

const Web3Data: FC = () => {
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;

  window.ethereum.on("accountsChanged", function (accounts: any) {
    if (connectedWeb3 && connectedWeb3.account !== accounts[0]) {
      dispatch({ type: "updateAccount", account: accounts[0] });
    }
  });

  useBalances();

  console.log("state", state);

  return <div></div>;
};

export default Web3Data;
