
import { WeekResponse } from '@/types/weeks';
import { QueryRequest } from '@/utils/QueryRequest';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';
const ORGANIZATION_ID = 'your-organization-id';


export async function getWeekById(weekId: string) {
  const queryRequest = new QueryRequest<WeekResponse>(BASE_URL, '');
  queryRequest.addDefaultHeaders();
  return queryRequest.get(`week/${weekId}`);
}

export async function getWeeks() {
  const queryRequest = new QueryRequest<WeekResponse[]>(BASE_URL, ORGANIZATION_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.get('weeks');
}

export async function getWeeksByDate(year: string, month?: string): Promise<WeekResponse[]> {
  const endpoint = month ? `${BASE_URL}/weeks/${year}/${month}` : `${BASE_URL}/weeks/${year}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Erro ao buscar semanas');
  }

  return response.json();
}

export async function deleteWeek(weekId: string) {
  const queryRequest = new QueryRequest<void>(BASE_URL, '');
  queryRequest.addDefaultHeaders();
  return queryRequest.delete(`weeks/${weekId}`);
}



