export interface Portfolio {
  id: string;
  name: string;
  historyYears: number;
  description: string;
  weights: Weights;
  yearlyReturns: {
    [key: number]: Returns;
  };
}

export interface Returns {
  apy: number;
  totalReturn: number;
  best12Months: number;
  worst12Months: number;
  worstReturn: number;
}

export interface Weights {
  [key: string]: number;
}
