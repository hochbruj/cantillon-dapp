import { User } from "../../sharedTypes/user.types";
import { db, Timestamp } from "./index";

export const saveUser = async (
  wallet: string,
  userAddress: string
): Promise<void> => {
  try {
    const address = userAddress.toLowerCase();
    const userRef = db.collection("users").doc(address);
    await userRef.set(
      { lastActiveAt: Timestamp.now(), address, wallet },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
    return;
  }
};

export const savePortfolio = async (
  userAddress: string,
  portfolioId: string
): Promise<void> => {
  try {
    const address = userAddress.toLowerCase();
    const userRef = db.collection("users").doc(address);
    await userRef.set({ portfolioId }, { merge: true });
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getUser = async (userAddress: string): Promise<User> => {
  const address = userAddress.toLowerCase();
  const userRef = db.collection("users").doc(address);
  const doc = await userRef.get();
  return doc.data() as User;
};
