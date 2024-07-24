import { CreateMatchDataRequested, GoalDetails, MatchResponse } from '@/types/match';
import { QueryRequest } from '@/utils/QueryRequest';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';
const ORGANIZATION_ID = 'your-organization-id';

export async function createMatch(matchData: CreateMatchDataRequested) {
  const queryRequest = new QueryRequest<MatchResponse, CreateMatchDataRequested>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.post('create_match', matchData);
}

export async function createGoals(goals: GoalDetails[]) {
  const queryRequest = new QueryRequest<GoalDetails[], GoalDetails[]>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.post('create_goals', goals);
}

export async function getMatchById(matchId: string) {
  const queryRequest = new QueryRequest<MatchResponse>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.getById(matchId, 'get_match');
}

export async function getMatches() {
  const queryRequest = new QueryRequest<Array<MatchResponse>>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.get('get_matches');
}

export async function deleteMatch(matchId: string) {
  const queryRequest = new QueryRequest<{ message: string }>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.delete(`delete_match/${matchId}`);
}

export async function createWeekWithTeams(date: string, teams: string[][]) {
  const response = await fetch(`${BASE_URL}/create_week_with_teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, teams }),
  });

  if (!response.ok) {
    throw new Error('Failed to create week and teams');
  }

  return await response.json();
}
