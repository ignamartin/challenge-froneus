import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import type { CampaignForm } from "../types/campaignForm";
import type { NewCampaign } from "../types/newCampaign";

const API_URL = "http://localhost:3000";

export const campaignService = {
  createCampaign: async (campaign: CampaignForm): Promise<NewCampaign> => {
    try {
      const campaignWithId = {
        ...campaign,
        id: uuidv4(),
        state: "activa",
      };

      const { data } = await axios.post(`${API_URL}/campaigns`, campaignWithId);
      return data;
    } catch (error) {
      console.error("Error en createCampaign:", error);
      throw error;
    }
  },

  getCampaign: async (id: string): Promise<NewCampaign> => {
    try {
      const { data } = await axios.get(`${API_URL}/campaigns/${id}`);
      return data;
    } catch (error) {
      console.error("Error en getCampaign:", error);
      throw error;
    }
  },

  updateCampaign: async (
    id: string,
    campaign: Partial<NewCampaign>
  ): Promise<NewCampaign> => {
    try {
      const { data } = await axios.patch(
        `${API_URL}/campaigns/${id}`,
        campaign
      );
      return data;
    } catch (error) {
      console.error("Error en updateCampaign:", error);
      throw error;
    }
  },
};
