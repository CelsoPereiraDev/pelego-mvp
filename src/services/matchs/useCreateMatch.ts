
import { CreateMatchDataRequested } from '@/types/match';
import useSWR from 'swr';
import { createMatch } from './resources';

export function useCreateMatch() {
  const { data, error, mutate } = useSWR('/api/create_match', () => null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const createNewMatch = async (matchData: CreateMatchDataRequested) => {
    const createdMatch = await createMatch(matchData);
    mutate();
    return createdMatch;
  };

  return {
    createNewMatch,
    data,
    error,
    isLoading: !error && !data,
  };
}
