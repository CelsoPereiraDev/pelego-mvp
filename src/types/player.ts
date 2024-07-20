import { playerGetOverallSchema } from "@/schema/player";
import { StaticImageData } from "next/image";
import { z } from "zod";

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
  name: string;
  overall: PlayerOverall;
  country?: string;
  value?: string;
  team?: string | StaticImageData;
  image?: string | StaticImageData;
  position: string;
  isChampion?: boolean;
}

export interface PlayerGoals {
  name: string;
  goals: number;
}

export type PlayerGetOverallFormData = z.infer<typeof playerGetOverallSchema>;

export interface PlayerResponse {
  id: string;
  name: string;
  overall: OverallDataRequested;
  country?: string;
  team?: string;
  image?: string;
  position: 'MEI' | 'ATK' | 'DEF' | 'GOL';
  isChampion: boolean;
}

export interface OverallDataRequested {
  pace: number;
  shooting: number;
  passing: number;
  dribble: number;
  defense: number;
  physics: number;
  overall: number;
}

export interface CreatePlayerDataRequested {
  name: string;
  country?: string;
  team?: string;
  image?: string;
  position: 'MEI' | 'ATK' | 'DEF' | 'GOL';
  overall: OverallDataRequested;
  isChampion: boolean;
}
