import { Player, Team } from "@/utils/createTeam";
import PlayerCardSmall from "../PlayerCardSmall";


export default function Field( { team }:any) {
  const chunkArray = (array: { slice: (arg0: number, arg1: any) => Player; }, sizes: any[]) => {
    const chunkedArray: Player[] = [];
    let index = 0;
    sizes.forEach(size => {
      chunkedArray.push(array.slice(index, index + size));
      index += size;
    });
    return chunkedArray;
  };

  const playerGroups = chunkArray(team.players, [3, 2, 2]);

  return (
    <div className="bg-[url('../../public/field.jpg')] h-[630px] w-[400px] bg-contain bg-center bg-no-repeat">
      <div className="flex flex-col h-full justify-end items-center gap-14 pb-[100px]">
        {playerGroups.map((playersInGroup, groupIndex) => (
          <div key={groupIndex} className="flex flex-row gap-10 justify-center w-[92%]">
            {playersInGroup.map((playerData, index) => (
              <PlayerCardSmall key={index} playerData={playerData} />
            ))}          
          </div>
        ))}
      </div>
    </div>
  );
}
       