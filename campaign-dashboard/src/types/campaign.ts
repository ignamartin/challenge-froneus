import type { Clients } from "./clients";

export interface Campaign {
  id: number;
  name: string;
  creationDate: Date;
  callStartDate: Date;
  record: boolean;
  state: "activa" | "finalizada" | "en espera";
  clients: Clients[];
}
