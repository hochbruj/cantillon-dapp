// store.js
import React, { FC, createContext, useContext, useReducer } from "react";
import Web3 from "web3";
import { TokenAmounts, EthereumNetwork } from "../sharedTypes/eth.types";

interface State {
  connectedWeb3: ConnectedWeb3 | null;
  balances: TokenAmounts | null;
  prices: TokenAmounts | null;
  message: Message | null;
}

export interface ConnectedWeb3 {
  web3: Web3;
  account: string;
  network: EthereumNetwork;
  wallet: string;
}

type MessageType = "error" | "warning" | "info" | "success";

export interface Message {
  type: MessageType;
  text: string;
}

type Action =
  | { type: "connectWeb3"; connectedWeb3: ConnectedWeb3 }
  | { type: "disconnectWeb3" }
  | { type: "updateBalances"; balances: TokenAmounts }
  | { type: "updateAccount"; account: string }
  | { type: "updatePrices"; prices: TokenAmounts }
  | { type: "updateMessage"; message: Message | null };

const initialState: State = {
  connectedWeb3: null,
  balances: null,
  prices: null,
  message: null,
};

type StoreContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "connectWeb3":
      return {
        ...state,
        connectedWeb3: action.connectedWeb3,
      };
    case "updateAccount":
      return {
        ...state,
        connectedWeb3: { ...state.connectedWeb3!, account: action.account },
      };
    case "disconnectWeb3":
      return {
        ...state,
        connectedWeb3: null,
      };
    case "updateBalances":
      return {
        ...state,
        balances: action.balances,
      };
    case "updatePrices":
      return {
        ...state,
        prices: action.prices,
      };
    case "updateMessage":
      return {
        ...state,
        message: action.message,
      };
  }
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
