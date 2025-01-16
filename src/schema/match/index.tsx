import { z } from 'zod';

const GoalSchema = z.object({
  goals: z.number(), // Número de gols (ou gol contra)
  playerId: z.string(), // ID do jogador que marcou
  ownGoalPlayerId: z.string().optional(), // ID do jogador que fez gol contra, opcional
});

const AssistSchema = z.object({
  assists: z.number(),
  playerId: z.string(),
});

const TeamSchema = z.object({
  players: z.array(z.string()),
});

const GoalDetailsSchema = z.object({
  goalsCount: z.string().optional(), // Número total de gols, opcional
  whoScores: z.array(GoalSchema).optional(), // Detalhes de quem marcou, opcional
});

const MatchSchema = z.object({
  homeTeamId: z.string(),
  homeGoals: GoalDetailsSchema.optional(), // Detalhes dos gols do time da casa, opcional
  homeAssists: z.array(AssistSchema).optional(), // Assistências do time da casa, opcional
  awayGoals: GoalDetailsSchema.optional(), // Detalhes dos gols do time visitante, opcional
  awayAssists: z.array(AssistSchema).optional(), // Assistências do time visitante, opcional
  awayTeamId: z.string(),
}).refine((data) => {
  const homeGoalsCount = parseInt(data.homeGoals?.goalsCount || "0", 10);
  const awayGoalsCount = parseInt(data.awayGoals?.goalsCount || "0", 10);

  // Soma dos gols normais e gols contra
  const totalHomeGoals = data.homeGoals?.whoScores?.reduce((acc, curr) => acc + (curr.ownGoalPlayerId ? 0 : curr.goals), 0) || 0;
  const totalAwayGoals = data.awayGoals?.whoScores?.reduce((acc, curr) => acc + (curr.ownGoalPlayerId ? 0 : curr.goals), 0) || 0;
  const totalHomeOwnGoals = data.awayGoals?.whoScores?.reduce((acc, curr) => acc + (curr.ownGoalPlayerId ? curr.goals : 0), 0) || 0;
  const totalAwayOwnGoals = data.homeGoals?.whoScores?.reduce((acc, curr) => acc + (curr.ownGoalPlayerId ? curr.goals : 0), 0) || 0;

  const finalHomeGoals = totalHomeGoals + totalAwayOwnGoals; // Gols do time + gols contra do adversário
  const finalAwayGoals = totalAwayGoals + totalHomeOwnGoals; // Gols do time + gols contra do adversário

  if (homeGoalsCount && finalHomeGoals !== homeGoalsCount) {
    return false; // homeGoalsCount existe e não corresponde à soma dos gols
  }
  if (awayGoalsCount && finalAwayGoals !== awayGoalsCount) {
    return false; // awayGoalsCount existe e não corresponde à soma dos gols
  }
  return true;
}, {
  message: 'A soma dos gols não coincide com o valor em goalsCount.',
  path: ['matches'], // Opcionalmente, você pode ajustar este caminho para ser mais específico
});

export const CreateMatchSchema = z.object({
  date: z.string(),
  teams: z.array(TeamSchema),
  matches: z.array(MatchSchema),
});
