import { TeamResponse } from "./match";
import { PlayerResponse } from "./player";

export interface WeekResponse {
  id: string;
  date: string;
  teams: TeamResponse[];
}
export interface TeamMemberResponse {
  id: string;
  player: PlayerResponse;
}

