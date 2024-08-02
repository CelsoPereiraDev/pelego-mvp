import { CreateMatch } from '@/app/match/page';
import { CreateMatchDataRequested } from '@/types/match';

export function mapFormDataToBackend(data: CreateMatch, createdTeams: { id: string }[], weekId: string) {
  const matchesData: CreateMatchDataRequested[] = data.matches.map(match => {
    const homeTeam = createdTeams[parseInt(match.homeTeamId, 10)];
    const awayTeam = createdTeams[parseInt(match.awayTeamId, 10)];

    if (!homeTeam || !awayTeam) {
      throw new Error('Missing team IDs in matches data');
    }

    const mapGoals = (goals) => {
      return goals
        .filter(goal => goal.goals !== undefined && goal.goals !== null)
        .map(goal => {
          if (goal.playerId === 'GC') {
            return {
              ownGoalPlayerId: goal.ownGoalPlayerId,
              goals: typeof goal.goals === 'string' ? parseInt(goal.goals, 10) : goal.goals
            };
          } else {
            return {
              playerId: goal.playerId,
              goals: typeof goal.goals === 'string' ? parseInt(goal.goals, 10) : goal.goals
            };
          }
        });
    };

    return {
      weekId,
      date: new Date(data.date).toISOString(),
      homeTeamId: homeTeam.id,
      awayTeamId: awayTeam.id,
      homeGoals: mapGoals(match.homeGoals.whoScores),
      awayGoals: mapGoals(match.awayGoals.whoScores)
    };
  });

  return { matchesData };
}
