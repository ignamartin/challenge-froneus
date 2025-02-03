import type { CampaignForm } from "./campaignForm";

export interface NewCampaign extends CampaignForm {
  id: string;
  state: "activa" | "finalizada" | "en espera";
}
