export interface Portfolio {
  id: string;
  name: string;
  description: string;
  weights: Weights;
  year1: Returns;
  year3: Returns;
  year5: Returns;
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
