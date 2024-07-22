import { PlayerResponse } from '@/types/player';
import useSWR, { useSWRConfig } from 'swr';
import { deletePlayer, getPlayer } from './resources';

export function usePlayer(playerId: string, initialData?: PlayerResponse) {
  const { data, error, isLoading } = useSWR(playerId ? `/api/get_player/${playerId}` : null, () => getPlayer(playerId), {
    fallbackData: initialData,
  });

  const { mutate } = useSWRConfig();

  const methodsHandler = {
    delete: async function _delete() {
      await deletePlayer(playerId);
      mutate(`/api/get_players`);
    },
  };

  return {
    player: data,
    delete: methodsHandler.delete,
    isLoading,
    isError: error,
  };
}
