import { FC, useEffect, useState } from "react";
import { useBalances } from "../hooks/useBalances";
import { Message, useStore } from "../store/store";
import { usePrices } from "../hooks/usePrices";
import { getPortfolios } from "../services/api/getPortfolios";
import { getUser, saveUser } from "../services/firebase/user";
import { networks } from "../config/ethData";
import { capitalize } from "../utilities/formatters";

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
    const updateUser = async () => {
      await saveUser(state.connectedWeb3?.wallet!, account);
      const user = await getUser(account);
      dispatch({ type: "updateUser", user });
    };
    if (account) {
      dispatch({ type: "updateAccount", account });
      updateUser();
    }
  }, [account]);

  if (state.connectedWeb3) {
    window.ethereum.on("accountsChanged", function (accounts: any) {
      setAccount(accounts[0]);
    });

    window.ethereum.on("networkChanged", function (networkId: any) {
      if (networks[networkId] != process.env.REACT_APP_ETHEREUM_NETWORK) {
        const message: Message = {
          type: "error",
          text: `Wrong network! Please change your wallet to ${capitalize(
            process.env.REACT_APP_ETHEREUM_NETWORK!
          )} Network.`,
        };
        dispatch({ type: "updateMessage", message });
        dispatch({ type: "disconnectWeb3" });
      }
    });
  }

  useBalances(account);

  console.log("state", state);

  return <div></div>;
};

export default Web3Data;
