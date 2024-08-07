'use client';

import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { useParams } from 'next/navigation';
import React from 'react';

interface PlayerGoalsMap {
  [playerId: string]: {
    name: string;
    goals: number;
  };
}

const TopScorersByYear: React.FC = () => {
  const params = useParams();
  const year = params.year as string;

  const { weeks, isLoading, isError } = useWeeksByDate(year);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  const playerGoalsMap: PlayerGoalsMap = {};


  const processedMatches = new Set<string>();

  weeks?.forEach((week) => {
    week.teams.flatMap((team) => team.matchesHome.concat(team.matchesAway)).forEach((match) => {
      if (!processedMatches.has(match.id)) {
        processedMatches.add(match.id);

        match.goals.forEach((goal) => {
          if (goal.player) {
            if (!playerGoalsMap[goal.player.id]) {
              playerGoalsMap[goal.player.id] = { name: goal.player.name, goals: 0 };
            }
            playerGoalsMap[goal.player.id].goals += goal.goals;
          }
        });
      }
    });
  });

  const topScorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals);

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">
        Artilharia de {year}
      </h1>
      <div className="min-w-[800px] p-6 bg-white h-full rounded-lg overflow-auto text-black flex flex-col gap-4">
        <h3 className="text-xl">Artilheiros</h3>
        <ul className="flex flex-col gap-2">
          {topScorers.map((player, index) => (
            <li key={index}>
              {player.name} - {player.goals} {player.goals === 1 ? 'gol' : 'gols'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopScorersByYear;
