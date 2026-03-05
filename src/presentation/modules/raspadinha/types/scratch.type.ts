export type PrizeType = 'brinde' | 'desconto' | 'vale' | 'sorteio';

export interface Prize {
  id: string;
  name: string;
  type: PrizeType;
  quantity: number;
  remainingQuantity: number;
  probability: number; // 0-100
}

export interface ScratchCampaign {
  id: string;
  name: string;
  description: string;
  maxCards: number;
  usedCards: number;
  prizes: Prize[];
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
}

export interface ScratchResult {
  id: string;
  campaignId: string;
  campaignName: string;
  date: string;
  won: boolean;
  prizeName: string | null;
  prizeType: PrizeType | null;
}

export interface CampaignFormData {
  name: string;
  description: string;
  maxCards: number;
  prizes: Omit<Prize, 'id' | 'remainingQuantity'>[];
  startDate: string;
  endDate: string;
  active: boolean;
}
