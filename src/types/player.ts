import { StaticImageData } from "next/image";

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
    country: string;
    label: string;
    value: string;
    team: string | StaticImageData;
    image: string | StaticImageData;
    position: string;
    isChampion?: boolean;
  }

