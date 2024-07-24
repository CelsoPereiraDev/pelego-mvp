'use client';

import { useWeeks } from '@/services/weeks/useWeeks';
import { format } from 'date-fns';
import React from 'react';

const WeeksList: React.FC = () => {
  const { weeks, isLoading, error } = useWeeks();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Semanas</h1>
      <ul>
        {weeks?.map(week => (
          <li key={week.id}>
            <span>{formatDate(week.date)}</span>
            <ul>
              {week.teams.map((team, index) => (
                <li key={team.id}>
                  <h3>Team {index}</h3>          
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeksList;
