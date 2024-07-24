import { CreateMatch } from "@/app/match/page";
import { CreateMatchDataRequested, CreateWeekWithTeamsBody, GoalDetails } from "@/types/match";

export function mapFormDataToBackend(data: CreateMatch, createdTeams: { id: string }[]): { weekData: CreateWeekWithTeamsBody, matchesData: CreateMatchDataRequested[] } {
  console.log("🚀 ~ mapFormDataToBackend ~ createdTeams:", createdTeams)
  const weekData: CreateWeekWithTeamsBody = {
    date: data.date,
    teams: data.teams.map(team => team.players)
  };

  const matchesData: CreateMatchDataRequested[] = data.matches.map(match => {
    const homeGoals: GoalDetails[] = match.homeGoals.whoScores
      .filter(goal => goal.playerId && goal.goals !== undefined)
      .map(goal => ({
        playerId: goal.playerId,
        goals: Number(goal.goals)
      }));

    const awayGoals: GoalDetails[] = match.awayGoals.whoScores
      .filter(goal => goal.playerId && goal.goals !== undefined)
      .map(goal => ({
        playerId: goal.playerId,
        goals: Number(goal.goals)
      }));

    

    const homeTeam = createdTeams.find((_, index) => index.toString() === match.homeTeamId);
    console.log("🚀 ~ mapFormDataToBackend ~ match.homeTeamId:", match.homeTeamId)
    const awayTeam = createdTeams.find((_, index) => index.toString() === match.awayTeamId);

    return {
      date: data.date,
      homeTeamId: homeTeam ? homeTeam.id : '',
      awayTeamId: awayTeam ? awayTeam.id : '',
      homeGoals,
      awayGoals
    };
  });

  return { weekData, matchesData };
}
