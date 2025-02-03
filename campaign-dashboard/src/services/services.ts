import axios from "axios";
import type { Campaign } from "../types/campaign";

const BASE_URL = "http://localhost:3000";

export const campaignService = {
  getCampaigns: async (): Promise<Campaign[]> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/campaigns`);
      return data.map((campaign: Campaign) => ({
        ...campaign,
        clients: campaign.clients || [],
      }));
    } catch (error) {
      console.error("Error al obtener las campañas:", error);
      throw error;
    }
  },

  deleteCampaign: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/campaigns/${id}`);
      console.log("Campaña eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la campaña:", error);
      throw error;
    }
  },
};
