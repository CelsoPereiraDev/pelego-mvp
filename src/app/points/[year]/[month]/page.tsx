'use client'

import { calculateSimplePlayerStats, SimplePlayerStats } from '@/mapper/playerStatMapper';
import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PlayerStatsPage: React.FC = () => {
  const params = useParams();
  const year = params.year as string;
  const month = params.month as string | undefined;
  const { weeks, isLoading, isError } = useWeeksByDate(year, month);

  const [playerStats, setPlayerStats] = useState<SimplePlayerStats[]>([]);

  useEffect(() => {
    if (weeks && !isLoading && !isError) {
      const stats = calculateSimplePlayerStats(weeks);
      setPlayerStats(stats);
    }
  }, [weeks, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Estatísticas dos Jogadores no Ano</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontos</th>
            <th>Vitórias</th>
            <th>Empates</th>
            <th>Derrotas</th>
            <th>Porcentagem de Pontos</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map(({ name, points, wins, draws, losses, pointsPercentage }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{points}</td>
              <td>{wins}</td>
              <td>{draws}</td>
              <td>{losses}</td>
              <td>{pointsPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsPage;
