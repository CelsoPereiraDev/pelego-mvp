import { PlayerResponse } from "./player";

export interface WeekResponse {
  id: string;
  date: string;
  teams: TeamResponse[];
}

export interface TeamResponse {
  id: string;
  weekId: string;
  players: TeamMemberResponse[];
  champion: boolean;
}

export interface TeamMemberResponse {
  id: string;
  player: PlayerResponse;
}

