import { WeekResponse } from "@/types/weeks";

export const mapWeekToFormValues = (week: WeekResponse) => {
  const mappedMatchIds = new Set();

  // Mapeia o ID dos times para o índice correspondente em teams
  const teamIndexMap = week?.teams.reduce((acc, team, index) => {
    acc[team.id] = index;
    return acc;
  }, {} as Record<string, number>);

  return {
    date: week?.date.toString(),
    teams: week?.teams.map(team => ({
      players: team.players.map(player => player.playerId),
    })),
    matches: week?.teams.flatMap(team => {
      return team.matchesHome.concat(team.matchesAway).map(match => {
        if (mappedMatchIds.has(match.id)) return null;
        mappedMatchIds.add(match.id);

        const homeGoals = match.goals
          .filter(goal => goal.ownGoalPlayerId === null && goal.playerId && match.homeTeamId === team.id)
          .map(goal => ({
            goals: goal.goals,
            playerId: goal.playerId,
            ownGoalPlayerId: null,
          }));

        const awayGoals = match.goals
          .filter(goal => goal.ownGoalPlayerId === null && goal.playerId && match.awayTeamId === team.id)
          .map(goal => ({
            goals: goal.goals,
            playerId: goal.playerId,
            ownGoalPlayerId: null,
          }));

        const ownGoalsHome = match.goals
          .filter(goal => goal.ownGoalPlayerId && match.homeTeamId === team.id)
          .map(goal => ({
            goals: goal.goals,
            playerId: null,
            ownGoalPlayerId: goal.ownGoalPlayerId,
          }));

        const ownGoalsAway = match.goals
          .filter(goal => goal.ownGoalPlayerId && match.awayTeamId === team.id)
          .map(goal => ({
            goals: goal.goals,
            playerId: null,
            ownGoalPlayerId: goal.ownGoalPlayerId,
          }));

        return {
          homeTeamId: teamIndexMap[match.homeTeamId], // Mapeia para o índice do time mandante
          awayTeamId: teamIndexMap[match.awayTeamId], // Mapeia para o índice do time visitante
          homeGoals: {
            goalsCount: (homeGoals.length + ownGoalsAway.length).toString(),
            whoScores: homeGoals.concat(ownGoalsAway),
          },
          awayGoals: {
            goalsCount: (awayGoals.length + ownGoalsHome.length).toString(),
            whoScores: awayGoals.concat(ownGoalsHome),
          },
          homeAssists: match.assists
            .filter(assist => match.homeTeamId === team.id)
            .map(assist => ({
              assists: assist.assists,
              playerId: assist.playerId,
            })),
          awayAssists: match.assists
            .filter(assist => match.awayTeamId === team.id)
            .map(assist => ({
              assists: assist.assists,
              playerId: assist.playerId,
            })),
        };
      }).filter(match => match !== null);
    }),
  };
};
