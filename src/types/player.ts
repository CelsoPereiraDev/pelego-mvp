import { playerGetOverallSchema } from "@/schema/player";
import { z } from "zod";

export enum PlayerPosition {
  MEI = 'MEI',
  ATK = 'ATK',
  DEF = 'DEF',
  GOL = 'GOL'
}

export interface PlayerOverall {
  pace: number;
  shooting: number;
  passing: number;
  dribble: number;
  defense: number;
  physics: number;
  overall: number;
}

export interface Player {
  id: string;
  name: string;
  overall: PlayerOverall;
  country?: string;
  value?: string;
  team?: string;
  image?: string;
  position: PlayerPosition;
  isChampion: boolean;
  monthLVP?: boolean;
  monthTopPointer?: boolean;
  monthStriker?: boolean;
  monthChampion?: boolean;
  monthBestDefender?: boolean;
}

export interface PlayerGoals {
  name: string;
  goals: number;
}

export type PlayerGetOverallFormData = z.infer<typeof playerGetOverallSchema>;

export interface PlayerResponse {
  id: string;
  name: string;
  overall: PlayerOverall;
  country?: string;
  image?: string;
  position: PlayerPosition;
  isChampion: boolean;
  goalsCount?: number;
}

export interface CreatePlayerDataRequested {
  name: string;
  country?: string;
  team?: string;
  image?: string;
  position: PlayerPosition;
  overall: PlayerOverall;
  isChampion: boolean;
}
