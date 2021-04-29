import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { tokens, contractsAddressesMap } from "../config/ethData";
import { TokenAmounts, Token } from "../sharedTypes/eth.types";
import ERC20 from "../contracts/ERC20.json";
import { saveBalance } from "../services/firebase/balance";

export const useBalances = (account: string) => {
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;
  const [updateBalance, setUpdateBalance] = useState(false);
  const { web3, network } = connectedWeb3 || {};

  const getBalances = async () => {
    const erc20TokenList = Object.keys(tokens).filter(
      (token) => token !== "ETH"
    ) as [Token];
    const erc20Contracts = erc20TokenList.map(
      (token) =>
        new web3!.eth.Contract(
          ERC20.abi as any,
          contractsAddressesMap[network!][token]
        )
    );
    const balancPromises = Promise.all(
      erc20Contracts.map((contract) =>
        contract.methods.balanceOf(account).call()
      )
    );
    const balanceResults = await balancPromises;
    let balances = {} as TokenAmounts;

    let i = 0;
    for (const token of erc20TokenList) {
      balances[token] = balanceResults[i];
      i++;
    }
    balances.ETH = await web3!.eth.getBalance(account!);
    dispatch({ type: "updateBalances", balances });
    //update in firebase
    if (updateBalance) {
      saveBalance(account, balances);
    }
  };

  useEffect(() => {
    if (updateBalance) {
      getBalances();
      setUpdateBalance(false);
    }
  }, [updateBalance]);

  useEffect(() => {
    if (account && web3 && network) {
      getBalances();
    }
  }, [account]);

  return setUpdateBalance;
};
