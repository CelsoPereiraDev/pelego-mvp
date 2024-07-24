import { PlayerResponse } from "@/types/player";

export interface MatchResponse {
  id: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: TeamResponse;
  awayTeam: TeamResponse;
  result?: MatchResultResponse;
  goals: GoalResponse[];
}

export interface CreateMatchDataRequested {
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: GoalDetails[];
  awayGoals: GoalDetails[];
}

export interface GoalDetails {
  playerId: string;
  goals: number;
}

export interface TeamResponse {
  id: string;
  name: string;
  players: PlayerResponse[];
}

export interface CreateWeekWithTeamsBody {
  date: string;
  teams: string[][];
}

export interface MatchResultResponse {
  homeGoals: number;
  awayGoals: number;
}

export interface GoalResponse {
  id: string;
  matchId: string;
  playerId: string;
  match: MatchResponse;
  player: PlayerResponse;
}

export type CreateMatch = {
  date: string;
  teams: {
    players: string[];
  }[];
  matches: {
    homeTeamId: string;
    homeGoals: {
      goalsCount: string;
      whoScores: {
        goals: number;
        playerId: string;
      }[];
    };
    awayGoals: {
      goalsCount: string;
      whoScores: {
        goals: number;
        playerId: string;
      }[];
    };
    awayTeamId: string;
  }[];
};
