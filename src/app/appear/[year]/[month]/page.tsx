'use client'

import { useWeeksByDate } from '@/services/weeks/useWeeksByDate';
import { TeamMemberResponse, WeekResponse } from '@/types/weeks';

import { useParams } from 'next/navigation';
import React from 'react';

interface PlayerParticipation {
  name: string;
  count: number;
  participation: number;
}

const PlayerParticipationByMonth: React.FC = () => {
  const params = useParams();
  const year = params.year as string;
  const month = params.month as string;

  const { weeks, isLoading, isError } = useWeeksByDate(year, month);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  const totalWeeks = weeks?.length || 0;
  const playerParticipationMap: { [key: string]: { name: string, count: number } } = {};


  weeks?.forEach((week: WeekResponse) => {
    week.teams.forEach((team) => {
      team.players.forEach((teamMember: TeamMemberResponse) => {
        const playerId = teamMember.player.id;
        const playerName = teamMember.player.name;
        if (!playerParticipationMap[playerId]) {
          playerParticipationMap[playerId] = { name: playerName, count: 0 };
        }
        playerParticipationMap[playerId].count += 1;
      });
    });
  });

  const playerParticipationList: PlayerParticipation[] = Object.values(playerParticipationMap).map(player => ({
    name: player.name,
    count: player.count,
    participation: (player.count / totalWeeks) * 100
  }));

  playerParticipationList.sort((a, b) => b.participation - a.participation);

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Participação de Jogadores em {month}/{year}</h1>
      <div className="min-w-[800px] p-6 bg-white h-full rounded-lg overflow-auto text-black flex flex-col gap-4">
        <h3 className="text-xl">Jogadores</h3>
        <ul className="flex flex-col gap-2">
          {playerParticipationList.map((player, index) => (
            <li key={index}>
              {player.name} - {player.count} vezes ({player.participation.toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerParticipationByMonth;
