import { TimestampType } from "../services/firebase";

export interface User {
  lastActiveAt: TimestampType;
  portfolioId: string | null;
}
