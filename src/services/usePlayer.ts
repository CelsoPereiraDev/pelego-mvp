import { PlayerResponse } from '@/types/player';
import useSWR from 'swr';
import { getPlayer } from './player/resources';


export function usePlayer(playerId: string, initialData?: PlayerResponse) {
  const { data, error, isLoading } = useSWR(playerId ? `/api/get_player/${playerId}` : null, () => getPlayer(playerId), {
    fallbackData: initialData,
  });

  return {
    player: data,
    isLoading,
    isError: error,
  };
}