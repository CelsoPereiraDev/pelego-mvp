'use client'

import PlayerCard from "@/components/PlayerCard";
import { usePlayer } from "@/services/player/usePlayer";

interface PlayerProps {
  params: {
    playerSlug: string;
  };
}

export default function PlayerPage({ params: {  playerSlug } }: PlayerProps) {

 const {player} = usePlayer(playerSlug)

return (
 <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
  <h1 className="text-3xl text-center mb-9">{player?.name}</h1>
  <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg w-full text-black flex flex-row gap-24">
   <div>{player && <PlayerCard playerData={player} />}</div>
  </div>
 </div>
)
}