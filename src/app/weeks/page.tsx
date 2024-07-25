'use client';

import { useWeeks } from '@/services/weeks/useWeeks';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';

const WeeksList: React.FC = () => {
  const { weeks, isLoading, error } = useWeeks();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy');
  };

  const goToWeekPage = (weekId: string) => {
    router.push(`/week/${weekId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Semanas</h1>
      <ul className="w-[1440px] p-6 bg-white h-full rounded-lg overflow-auto flex flex-col gap-3">
        {weeks?.map((week, index) => (
          <li
            key={week.id}
            className="text-black flex flex-row gap-4 cursor-pointer"
            onClick={() => goToWeekPage(week.id)}
          >
            <span>Semana {index + 1}</span>
            <span>{formatDate(week.date)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeksList;
