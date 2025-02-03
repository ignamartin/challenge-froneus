import type { Campaign } from "./campaign";

export interface CampaignState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  setCampaigns: (campaigns: Campaign[]) => void;
  setSelectedCampaign: (campaign: Campaign | null) => void;
}
