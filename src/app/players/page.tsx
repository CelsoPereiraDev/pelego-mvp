'use client'

import PlayerCardSmall from "@/components/PlayerCardSmall";
import { usePlayers } from "@/services/player/usePlayers";

export default function AllPlayersPage() {
  const { players } = usePlayers()

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Jogadores</h1>
      <div className="w-[1440px] p-6 bg-white h-full rounded-lg overflow-auto">
        <div className="flex flex-row gap-8 flex-wrap justify-start py-8">
          {players?.map((player, index) => (
            <div className='pb-10' key={index}>
              <PlayerCardSmall playerData={player} showOverall={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
