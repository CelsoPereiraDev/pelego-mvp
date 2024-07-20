import { CreatePlayerDataRequested, PlayerResponse } from '@/types/player';
import { QueryRequest } from '@/utils/QueryRequest';


const BASE_URL = 'http://localhost:3333/api';
const CLIENT_ID = 'client-id';

export async function getPlayers() {
  const queryRequest = new QueryRequest<Array<PlayerResponse>>(BASE_URL, CLIENT_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.get('get_players');
}

export async function createPlayer(playerData: CreatePlayerDataRequested) {
  const queryRequest = new QueryRequest<PlayerResponse, CreatePlayerDataRequested>(BASE_URL, CLIENT_ID);
  queryRequest.addDefaultHeaders();
  return queryRequest.post('create_players', playerData);
}
