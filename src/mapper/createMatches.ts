import { CreateMatch } from '@/app/match/page';
import { CreateMatchDataRequested } from '@/types/match';

export function mapFormDataToBackend(data: CreateMatch, createdTeams: { id: string }[], weekId: string) {
  const matchesData: CreateMatchDataRequested[] = data.matches.map(match => {
    const homeTeam = createdTeams[parseInt(match.homeTeamId, 10)];
    const awayTeam = createdTeams[parseInt(match.awayTeamId, 10)];

    if (!homeTeam || !awayTeam) {
      throw new Error('Missing team IDs in matches data');
    }

    return {
      weekId,
      date: new Date(data.date).toISOString(),
      homeTeamId: homeTeam.id,
      awayTeamId: awayTeam.id,
      homeGoals: match.homeGoals.whoScores
        .filter(goal => goal.playerId && goal.goals !== undefined && goal.goals !== null)
        .map(goal => ({
          playerId: goal.playerId,
          goals: typeof goal.goals === 'string' ? parseInt(goal.goals, 10) : goal.goals
        })),
      awayGoals: match.awayGoals.whoScores
        .filter(goal => goal.playerId && goal.goals !== undefined && goal.goals !== null)
        .map(goal => ({
          playerId: goal.playerId,
          goals: typeof goal.goals === 'string' ? parseInt(goal.goals, 10) : goal.goals
        }))
    };
  });

  return { matchesData };
}
