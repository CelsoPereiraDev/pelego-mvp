'use client'


import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { calculateSimpleAssistStats, SimpleAssistStats } from '@/utils/calculateAssists';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AssistLeaderPage: React.FC = () => {
  const params = useParams();
  const year = params.year as string;
  const month = params.month as string | undefined;
  const { weeks, isLoading, isError } = useWeeksByDate(year, month);

  const [assistStats, setAssistStats] = useState<SimpleAssistStats[]>([]);

  useEffect(() => {
    if (weeks && !isLoading && !isError) {
      const stats = calculateSimpleAssistStats(weeks);
      setAssistStats(stats);
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
      <h1>Líderes de Assistências em {year}</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Assistências</th>
          </tr>
        </thead>
        <tbody>
          {assistStats.map(({ name, assists }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssistLeaderPage;
