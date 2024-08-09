'use client'

import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { calculateBestDefender } from '@/utils/calculateBestDefender';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface GoalsConcededStats {
  name: string;
  goalsConceded: number;
  weeksPlayed: number;
}

const AssistLeaderPage: React.FC = () => {
  const params = useParams();
  const year = params.year as string;
  const month = params.month as string;
  const { weeks, isLoading, isError } = useWeeksByDate(year,month);

  const [concededGoalsStats, setConcededGoalsStats] = useState<GoalsConcededStats[]>([]);
  console.log("🆑 ~ concededGoalsStats:", concededGoalsStats)

  useEffect(() => {
    if (weeks && !isLoading && !isError) {
      const stats = calculateBestDefender(weeks);
      setConcededGoalsStats(stats);
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
      <h1>Melhores Defensores em {year}</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Gols Sofridos</th>
            <th>Média de Gols Sofridos Por partida</th>
            <th>Média de Gols Sofridos Por semana</th>
            <th>Semanas jogadas</th>
          </tr>
        </thead>
        <tbody>
         {concededGoalsStats.map((player, index) => (
          weeks && player.weeksPlayed >= weeks.length / 2 && (
            <tr key={index}>
              <td>{player.playerName}</td>
              <td>{player.goalsConceded}</td>
              <td>{player.averageGoalsConceded}</td>
              <td>{(player.goalsConceded/player.weeksPlayed).toFixed(2)}</td>
              <td>{player.weeksPlayed}</td>
            </tr>
          )
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssistLeaderPage;
