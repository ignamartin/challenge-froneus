import { create } from "zustand";
import type { Campaign } from "../types/campaign";
import type { CampaignState } from "../types/campaign-state";

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  selectedCampaign: null,

  setCampaigns: (campaigns: Campaign[]) => {
    set({ campaigns });
  },

  setSelectedCampaign: (campaign: Campaign | null) => {
    set({ selectedCampaign: campaign });
  },
}));
