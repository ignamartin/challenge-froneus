import { create } from "zustand";
import type { CampaignStore } from "../types/campaign-store";
import type { CampaignForm } from "../types/campaignForm";

const initialCampaign: CampaignForm = {
  name: "",
  creationDate: null,
  callStartDate: null,
  record: false,
  clients: [],
};

const initialClient = {
  name: "",
  lastname: "",
  telephone: "",
};

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaign: initialCampaign,
  newClient: initialClient,
  submitted: false,
  loading: false,
  clientDialog: false,
  deleteClientDialog: false,
  selectedClient: null,
  selectedCampaign: null,

  setCampaign: (campaign) => set({ campaign }),
  updateCampaignField: (field, value) =>
    set((state) => ({
      campaign: { ...state.campaign, [field]: value },
    })),
  resetCampaign: () => set({ campaign: initialCampaign }),

  setNewClient: (client) => set({ newClient: client }),
  updateNewClientField: (name, value) =>
    set((state) => ({
      newClient: { ...state.newClient, [name]: value },
    })),
  addClient: (client) =>
    set((state) => ({
      campaign: {
        ...state.campaign,
        clients: [...state.campaign.clients, client],
      },
    })),
  removeClient: (index) =>
    set((state) => ({
      campaign: {
        ...state.campaign,
        clients: state.campaign.clients.filter((_, i) => i !== index),
      },
    })),
  resetNewClient: () => set({ newClient: initialClient }),

  setSubmitted: (submitted) => set({ submitted }),
  setLoading: (loading) => set({ loading }),
  setClientDialog: (clientDialog) => set({ clientDialog }),
  setDeleteClientDialog: (deleteClientDialog) => set({ deleteClientDialog }),
  setSelectedClient: (selectedClient) => set({ selectedClient }),
  setSelectedCampaign: (selectedCampaign) => set({ selectedCampaign }),
}));
