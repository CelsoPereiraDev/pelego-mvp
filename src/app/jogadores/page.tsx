import PlayerCard from "@/components/PlayerCard";
import PlayerCardSmall from "@/components/PlayerCardSmall";
import { Player } from "@/utils/createTeam";
import PlayerMock from "@/utils/mockPlayers";


export default function AllPlayersPage() {
    const data: Player[] = PlayerMock();
    console.log("🚀 ~ data:", data)
    return (
        <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
            <h1 className="text-3xl text-center mb-9">Jogadores</h1>
            <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg">
                <div className="flex flex-row gap-8 flex-wrap justify-center py-8">

                {data.map((player, index) => (
                <div className='pb-10' key={index}>
                    <PlayerCardSmall  key={index} playerData={player} />
                </div>
                ))}
                </div>
            </div>
        </div>
    )
}