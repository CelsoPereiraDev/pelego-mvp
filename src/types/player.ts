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
