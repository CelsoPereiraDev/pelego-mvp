import { Player } from "@/types/player";
import PlayerCardSmall from "../PlayerCardSmall";
import { Team } from "@/types/team";

export default function Field({ team, showOverall }: { team: Team; showOverall: boolean }): JSX.Element {
  const chunkArray = (players: Player[], size: number): Player[][] => {
    const chunkedArray: Player[][] = [];
    for (let i = 0; i < players.length; i += size) {
      chunkedArray.push(players.slice(i, i + size));
    }
    return chunkedArray;
  };

  const groupedPlayers: { [key: string]: Player[] } = {
    ATK: [],
    MEI: [],
    DEF: [],
    GOL: [],
  };

  team.players.forEach((player: Player) => {
    if (player.position === 'ATK') {
      groupedPlayers.ATK.push(player);
    } else if (player.position === 'MEI') {
      groupedPlayers.MEI.push(player);
    } else if (player.position === 'DEF') {
      groupedPlayers.DEF.push(player);
    } else if (player.position === 'GOL') {
      groupedPlayers.GOL.push(player);
    }
  });

  const playerGroups: Player[][] = [];
  const positions: (keyof typeof groupedPlayers)[] = ['ATK', 'MEI', 'DEF', 'GOL'];
  positions.forEach(position => {
    const players = groupedPlayers[position];
    const chunkedPlayers = chunkArray(players, 5);
    playerGroups.push(...chunkedPlayers);
  });

  const gapValue = playerGroups.length === 4 ? 7 : 12;

  return (
    <div className="bg-[url('../../public/new_field.jpg')] h-[870px] w-[559px] bg-cover bg-center bg-no-repeat">
      <div className={`flex flex-col h-full justify-end gap-${gapValue} pb-[70px]`}>
        {playerGroups.map((playersInGroup, groupIndex) => (
          <div key={groupIndex} className="flex flex-row justify-around">
            {playersInGroup.map((playerData, index) => (
              <PlayerCardSmall key={index} playerData={playerData} showOverall={showOverall} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
