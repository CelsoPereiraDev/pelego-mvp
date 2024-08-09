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

  function mapMonthNumberToText(monthNumber:number) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return months[monthNumber - 1];
}

  return (
   <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Líderes de  Assistências de {month ? `${mapMonthNumberToText(Number(month))}` : `Ano ${year}`}</h1>
      <table className="min-w-[800px] p-6 bg-white h-full rounded-lg overflow-auto text-black flex flex-col gap-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th className='ml-1'>Assistências</th>
          </tr>
        </thead>
        <tbody >
          {assistStats.map(({ name, assists }, index) => (
            <tr key={index} className='flex flex-row justify-between gap-4 w-[120px]'>
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
