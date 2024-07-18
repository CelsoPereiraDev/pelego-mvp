import { z } from 'zod';

export const playerOverallSchema = z.object({
  pace: z.number().int().min(0).max(100),
  shooting: z.number().int().min(0).max(100),
  passing: z.number().int().min(0).max(100),
  dribble: z.number().int().min(0).max(100),
  defense: z.number().int().min(0).max(100),
  physics: z.number().int().min(0).max(100),
});


export const playerGetOverallSchema = z.object({
  name: z.string().min(1, { message: 'Nome do jogador é obrigatório' }),
  country: z.string().optional(),
  team: z.string().optional(),
  image: z.string().optional(),
  position: z.enum(['MEI', 'ATK', 'DEF', 'GOL'], { message: 'Posição inválida' }),
  overall: playerOverallSchema,
});


