export type EthereumNetwork = "kovan" | "mainnet";
export type Token = "WBTC" | "PMGT" | "aUSDC" | "ETH";

export type ContractsAddressesMap = {
  [key in EthereumNetwork]: {
    ETH: string;
    WBTC: string;
    USDC: string;
    PMGT: string;
    aUSDC: string;
    PortfolioBalancer: string;
  };
};

export type TokenDetailMap = {
  [key in Token]: {
    name: string;
    link: string;
    coingeckoId: string;
    assetClass: string;
    decimals: number;
  };
};

export type TokenAmounts = {
  [key in Token]: string;
};

export type UniswapAmounts = {
  [key in Token]: {
    amountOutMin: string;
    executionPrice: string;
  };
};

export type NetworkMap = {
  [key: number]: EthereumNetwork;
};
