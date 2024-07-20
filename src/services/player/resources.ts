import { CreatePlayerDataRequested, PlayerResponse } from "@/types/player";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Erro ao buscar jogadores');
  }
  return res.json();
});

export const usePlayers = () => {
  const { data, error } = useSWR('http://localhost:3333/api/get_players', fetcher);

  return {
    players: data,
    isLoading: !error && !data,
    isError: error
  };
};


export const createPlayer = async (playerData: CreatePlayerDataRequested): Promise<PlayerResponse> => {
  try {
    const response = await fetch('http://localhost:3333/api/create_players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar jogador');
    }

    return await response.json() as PlayerResponse;
  } catch (error) {
    console.error('Erro ao criar jogador:', error);
    throw error;
  }
};
