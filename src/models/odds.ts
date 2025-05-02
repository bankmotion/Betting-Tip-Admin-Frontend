import { MatchType } from './matches';

export interface OddsType {
  id: number;
  fixtureId: number;
  dataUpdateTimestamp: number;
  betType: number;
  betSubType: number;
  odds: number[];
  probability: number;
  roi: number;
  ev: number;
}
