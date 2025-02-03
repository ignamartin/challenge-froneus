import type { Client } from './client';

export interface CampaignForm {
  name: string;
  creationDate: Date | null;
  callStartDate: Date | null;
  record: boolean;
  clients: Client[];
}
