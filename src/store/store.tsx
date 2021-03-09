// store.js
import React, { FC, createContext, useContext, useReducer } from "react";
import Web3 from "web3";

interface State {
  connectedWeb3: ConnectedWeb3 | null;
}

export interface ConnectedWeb3 {
  web3: Web3;
  account: string;
  network: string;
  wallet: string;
}

type Action =
  | { type: "connectWeb3"; connectedWeb3: ConnectedWeb3 }
  | { type: "disconnectWeb3" };

const initialState: State = {
  connectedWeb3: null,
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
    case "disconnectWeb3":
      return {
        ...state,
        connectedWeb3: null,
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
