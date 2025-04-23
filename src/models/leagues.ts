import { CountryType } from './countries';

export interface LeagueType {
  id: number;
  leagueId: number;
  name: string;
  season: number;
  type: string;
  logo: string;
  country: CountryType;
  createdAt: string;
  updatedAt: string;
}
