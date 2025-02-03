import type { CampaignForm } from "./campaignForm";
import type { Client } from "./client";
import type { NewCampaign } from "./newCampaign";

export interface CampaignStore {
  campaign: CampaignForm;
  newClient: Omit<Client, "id">;
  submitted: boolean;
  loading: boolean;
  clientDialog: boolean;
  deleteClientDialog: boolean;
  selectedClient: Client | null;
  selectedCampaign: NewCampaign | null;

  setCampaign: (campaign: CampaignForm) => void;
  updateCampaignField: <K extends keyof CampaignForm>(
    field: K,
    value: CampaignForm[K]
  ) => void;
  resetCampaign: () => void;

  setNewClient: (client: Omit<Client, "id">) => void;
  updateNewClientField: (name: string, value: string) => void;
  addClient: (client: Client) => void;
  removeClient: (index: number) => void;
  resetNewClient: () => void;

  setSubmitted: (submitted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setClientDialog: (open: boolean) => void;
  setDeleteClientDialog: (open: boolean) => void;
  setSelectedClient: (client: Client | null) => void;
  setSelectedCampaign: (campaign: NewCampaign | null) => void;
}
