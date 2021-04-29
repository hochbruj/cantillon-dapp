import { Token, TokenAmounts } from "../../sharedTypes/eth.types";
import { db, Timestamp } from "./index";

export const saveBalance = async (
  userAddress: string,
  balances: TokenAmounts
): Promise<void> => {
  try {
    const tokenBalances = {} as TokenAmounts;
    const address = userAddress.toLowerCase();
    const balanceRef = db
      .collection("users")
      .doc(address)
      .collection("balances")
      .doc();
    Object.keys(balances).forEach((token) => {
      if (balances[token as Token] !== "0")
        tokenBalances[token as Token] = balances[token as Token];
    });
    await balanceRef.set(
      { createdAt: Timestamp.now(), tokenBalances },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
    return;
  }
};
