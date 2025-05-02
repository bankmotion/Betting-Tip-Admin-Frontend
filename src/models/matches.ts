import { LeagueType } from './leagues';
import { OddsType } from './odds';
import { TeamType } from './teams';
import { MatchStatus } from 'src/const/MatchConst';

export interface MatchType {
  id: number;
  fixtureId: number;
  leagueId: number;
  homeTeam: TeamType;
  awayTeam: TeamType;
  league: LeagueType;
  matchTimestamp: number;
  matchStatus: MatchStatus;
  dataUpdateTimestamp: number;

  odds: OddsType[];
}
