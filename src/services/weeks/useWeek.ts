
import { WeekResponse } from '@/types/weeks';
import useSWR from 'swr';
import { getWeekById } from './resources';

export function useWeek(weekId: string) {
  const { data, error, mutate } = useSWR<WeekResponse>(weekId ? `/api/get_week/${weekId}` : null, () => getWeekById(weekId), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    week: data,
    mutate,
    isError: error,
    isLoading: !error && !data,
  };
}
