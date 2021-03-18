import { useEffect } from "react";
import { useStore } from "../store/store";
import { tokens, contractsAddressesMap } from "../config/ethData";
import { TokenAmounts, Token } from "../sharedTypes/eth.types";
import ERC20 from "../contracts/ERC20.json";

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
      let balances = {} as TokenAmounts;

      let i = 0;
      for (const token of erc20TokenList) {
        balances[token] = balanceResults[i];
        i++;
      }
      balances.ETH = await web3.eth.getBalance(account!);
      dispatch({ type: "updateBalances", balances });
    }
    if (account) {
      console.log("calling get balances");
      getBalances();
    }
  }, [account]);
};
