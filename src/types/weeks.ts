import { TeamResponse } from "./match";
import { PlayerResponse } from "./player";

export interface WeekResponse {
  id: string;
  date: Date;
  teams: TeamResponse[];
}
export interface TeamMemberResponse {
  id: string;
  player: PlayerResponse;
}

