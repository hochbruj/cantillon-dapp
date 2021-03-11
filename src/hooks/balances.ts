import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { tokens, contractsAddressesMap } from "../config/ethData";
import { Balances, Token } from "../sharedTypes/eth.types";
import ERC20 from "../contracts/ERC20.json";
import { getPrices } from "../services/getPrices";

export const useBalances = () => {
  const { state, dispatch } = useStore();
  const { connectedWeb3 } = state;
  const account = connectedWeb3 && connectedWeb3.account;

  useEffect(() => {
    async function getBalances() {
      const { web3, network } = connectedWeb3!;
      const erc20TokenList = Object.keys(tokens).filter(
        (token) => token !== "ETH"
      ) as [Token];
      const erc20Contracts = erc20TokenList.map(
        (token) =>
          new web3.eth.Contract(
            ERC20.abi as any,
            contractsAddressesMap[network][token]
          )
      );
      const balancPromises = Promise.all(
        erc20Contracts.map((contract) =>
          contract.methods.balanceOf(account).call()
        )
      );
      const balanceResults = await balancPromises;
      let balances = {} as Balances;

      let i = 0;
      for (const token of erc20TokenList) {
        balances[token] = balanceResults[i];
        i++;
      }
      balances.ETH = await web3.eth.getBalance(account!);
      dispatch({ type: "updateBalances", balances });

      await getPrices();
    }
    if (account) {
      console.log("calling get balances");
      getBalances();
    }
  }, [account]);
};
