'use client'

import PlayerCard from "@/components/PlayerCard";
import { calculatePlayerStatsForPlayer } from "@/mapper/allPlayersStatsMapper";

import { usePlayer } from "@/services/player/usePlayer";
import { useWeeks } from "@/services/weeks/useWeeks";

interface PlayerProps {
  params: {
    playerSlug: string;
  };
}

export default function PlayerPage({ params: { playerSlug } }: PlayerProps) {
  const { weeks } = useWeeks();
  const { player } = usePlayer(playerSlug);
  const playerStats = calculatePlayerStatsForPlayer(weeks, player?.id);

  const renderPlayerStats = (stats: typeof playerStats) => {
    if (!stats) return null;

    const statsEntries = [
      { label: "Partidas", value: stats.matches, rank: stats.rankings?.matches },
      { label: "Vitórias", value: stats.wins, rank: stats.rankings?.wins },
      { label: "Derrotas", value: stats.losses, rank: stats.rankings?.losses },
      { label: "Empates", value: stats.draws, rank: stats.rankings?.draws },
      { label: "Pontos", value: stats.points, rank: stats.rankings?.points },
      { label: "Gols", value: stats.goals, rank: stats.rankings?.goals },
      { label: "Gols Contra", value: stats.ownGoals, rank: stats.rankings?.ownGoals },
      { label: "Gols Sofridos", value: stats.goalsConceded, rank: stats.rankings?.goalsConceded },
      { label: "Média de Gols Sofridos", value: stats.averageGoalsConceded.toFixed(2), rank: stats.rankings?.averageGoalsConceded },
      { label: "Percentual de Pontos", value: stats.pointsPercentage.toFixed(2) + "%", rank: stats.rankings?.pointsPercentage },
      { label: "Média de Pontos por Semana", value: stats.averagePointsPerWeek.toFixed(2), rank: stats.rankings?.averagePointsPerWeek },
      { label: "Média de Gols por Semana", value: stats.averageGoalsPerWeek.toFixed(2), rank: stats.rankings?.averageGoalsPerWeek },
      { label: "Média de Gols Sofridos por Semana", value: stats.averageGoalsConcededPerWeek.toFixed(2), rank: stats.rankings?.averageGoalsConcededPerWeek },
      { label: "Assistências", value: stats.assists, rank: stats.rankings?.assists },
      { label: "Média de Assistências por Semana", value: stats.averageAssistsPerWeek.toFixed(2), rank: stats.rankings?.averageAssistsPerWeek }
    ];


    return (
      <ul>
        {statsEntries.map((entry, index) => (
          <li key={index}>
            <strong>{entry.label}: </strong>{entry.value} {entry.rank !== undefined ? `(${entry.rank}º)` : ""}
          </li>
        ))}
      </ul>
    );
  };

  const renderTop5List = (title: string, list: Array<{ name: string; points: number; pointsExpected: number }>) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <strong>{item.name}:</strong> {((item.points / item.pointsExpected)* 100).toFixed(2)} %

          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9">{player?.name}</h1>
      <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg w-full text-black flex flex-row gap-24">
        <div>{player && <PlayerCard playerData={player} />}</div>
        <div>
          {playerStats && (
            <>
              {renderPlayerStats(playerStats)}
              <div className="grid grid-cols-2 mt-4 gap-4">
                {renderTop5List("Melhores Companheiros", playerStats.top5PointsWithPlayers)}
                {renderTop5List("Adversários que mais perdi pontos", playerStats.top5PointsAgainstPlayers)}
                {renderTop5List("Adversários que mais cederam pontos", playerStats.top5PointsGivenByPlayers)}
                {renderTop5List("Piores Companheiros", playerStats.top5WorstPerformingTeammates)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
