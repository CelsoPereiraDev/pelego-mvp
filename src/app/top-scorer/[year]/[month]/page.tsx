// pages/artilharia/[year]/[month].tsx

'use client';

import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { useParams } from 'next/navigation';
import React from 'react';

const TopScorersByDate: React.FC = () => {
  const params = useParams();
  const year = params.year as string;
  const month = params.month as string | undefined;

  const { weeks, isLoading, isError } = useWeeksByDate(year, month);
  console.log("🚀 ~ weeks:", weeks)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  function mapMonthNumberToText(monthNumber:number) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return months[monthNumber - 1];
}

  const playerGoalsMap: { [key: string]: { name: string; goals: number } } = {};

  weeks?.forEach((week) => {
    week.teams.flatMap((team) => team.matchesHome.concat(team.matchesAway)).forEach((match) => {
      match.goals.forEach((goal) => {
        if (!playerGoalsMap[goal.player.id]) {
          playerGoalsMap[goal.player.id] = { name: goal.player.name, goals: 0 };
        }
        playerGoalsMap[goal.player.id].goals += goal.goals;
      });
    });
  });

  const topScorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals);

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">
        Artilharia de {month ? `${mapMonthNumberToText(Number(month))}` : `Ano ${year}`}
      </h1>
      <div className="min-w-[800px] p-6 bg-white h-full rounded-lg overflow-auto text-black flex flex-col gap-4">
        <h3 className="text-xl">Artilheiros</h3>
        <ul className="flex flex-col gap-2">
          {topScorers.map((player, index) => (
            <li key={index}>
              {player.name} - {player.goals} gol(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopScorersByDate;
