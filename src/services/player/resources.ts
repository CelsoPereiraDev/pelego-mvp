import { CreatePlayerDataRequested, PlayerResponse } from "@/types/player";

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
