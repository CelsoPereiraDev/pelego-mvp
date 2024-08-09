import { PlayerResponse } from "@/types/player";
import { WeekResponse } from "@/types/weeks";

export interface SimpleAssistStats {
  name: string;
  assists: number;
}

export const calculateSimpleAssistStats = (weeks: WeekResponse[]): SimpleAssistStats[] => {
  const assistStatsMap: { [playerId: string]: SimpleAssistStats } = {};
  const processedMatches = new Set<string>(); // Manter o conjunto de partidas processadas fora do loop

  weeks?.forEach((week) => {
    week.teams?.flatMap((team) => team.matchesHome?.concat(team.matchesAway) ?? []).forEach((match) => {
      if (!processedMatches.has(match.id)) {
        processedMatches.add(match.id); // Adicionar a partida ao conjunto de processadas

        const allPlayers = new Set<PlayerResponse>();
        match.assists?.forEach(assist => {
          if (assist.player) allPlayers.add(assist.player);
        });

        allPlayers.forEach(player => {
          if (!assistStatsMap[player.id]) {
            assistStatsMap[player.id] = {
              name: player.name,
              assists: 0,
            };
          }
        });

        match.assists?.forEach(assist => {
          if (assist.playerId) {
            assistStatsMap[assist.playerId].assists += assist.assists;
          }
        });
      }
    });
  });

  // Convert to array and return sorted by assists in descending order
  return Object.values(assistStatsMap).sort((a, b) => b.assists - a.assists);
};
