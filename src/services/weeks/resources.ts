
import { WeekResponse } from '@/types/weeks';
import { QueryRequest } from '@/utils/QueryRequest';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';
const ORGANIZATION_ID = 'your-organization-id';

export async function getWeekById(weekId: string) {
  const queryRequest = new QueryRequest<WeekResponse>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.getById(weekId, 'get_week');
}

export async function getWeeks() {
  const queryRequest = new QueryRequest<WeekResponse[]>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.get('weeks');
}

