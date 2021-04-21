import {
  ContractsAddressesMap,
  EthereumNetwork,
  NetworkMap,
  TokenDetailMap,
} from "../sharedTypes/eth.types";

export const contractsAddressesMap: ContractsAddressesMap = Object.freeze({
  kovan: {
    ETH: "0x",
    WBTC: "0x967461bf547cc7faa454c3b817227dc68bf4edbe",
    PMGT: "0x7Ac060f34f52299f793E6B04B26cCCBEeB01a6dD",
    USDC: "0xe22da380ee6b445bb8273c81944adeb6e8450422",
    aUSDC: "0xe12afec5aa12cf614678f9bfeeb98ca9bb95b5b0",
    AAVE: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    UNI: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    YFI: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    REN: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    PortfolioBalancer: "0xd67F296EE273bc10bBE3F7E61d881820E7252a8B",
  },
  mainnet: {
    ETH: "0x",
    WBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    PMGT: "0xAFFCDd96531bCd66faED95FC61e443D08F79eFEf",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    aUSDC: "0xBcca60bB61934080951369a648Fb03DF4F96263C",
    AAVE: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    REN: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    PortfolioBalancer: "0xd67F296EE273bc10bBE3F7E61d881820E7252a8B",
  },
});

export const tokens: TokenDetailMap = Object.freeze({
  ETH: {
    name: "Ether",
    link: "https://ethereum.org/",
    assetClass: "Crypto",
    decimals: 18,
    coingeckoId: "ethereum",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    link: "https://wbtc.network/",
    assetClass: "Crypto",
    decimals: 8,
    coingeckoId: "wrapped-bitcoin",
  },
  PMGT: {
    name: "Perth Mint Gold Token",
    link: "https://pmgt.io/",
    assetClass: "Gold",
    decimals: 5,
    coingeckoId: "perth-mint-gold-token",
  },
  aUSDC: {
    name: "Aave Interest bearing USDC",
    link: "https://aave.com/",
    assetClass: "Cash",
    decimals: 6,
    coingeckoId: "aave-usdc",
  },
  UNI: {
    name: "Uniswap",
    link: "https://uniswap.org/",
    assetClass: "Crypto",
    decimals: 18,
    coingeckoId: "uniswap",
  },
  AAVE: {
    name: "Aave",
    link: "https://aave.com/",
    assetClass: "Crypto",
    decimals: 18,
    coingeckoId: "aave",
  },
  YFI: {
    name: "Yearn Finance",
    link: "https://yearn.finance/",
    assetClass: "Crypto",
    decimals: 18,
    coingeckoId: "yearn-finance",
  },
  REN: {
    name: "Ren Project",
    link: "https://renproject.io/",
    assetClass: "Crypto",
    decimals: 18,
    coingeckoId: "republic-protocol",
  },
});

export const networks: NetworkMap = Object.freeze({
  42: "kovan" as EthereumNetwork,
  1: "mainnet" as EthereumNetwork,
});
