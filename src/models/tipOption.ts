export interface SettingType {
  minEV: number;
  minOdds: number;
  maxOdds: number;
  minProbability: number;
  minTimeBeforeMatch: number;
  maxTipsPerDay: number;
  allowedBetTypes: number[];
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  overRound: boolean;
  enableHighOddAdjust: boolean;
  highOddSthreshold: number;
  extraProbBoost: number;
  scoreWeiPenalty: number;
  scoreWeiEV: number;
  scoreWeiProb: number;
}
