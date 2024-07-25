'use client';

import { useWeek } from '@/services/weeks/useWeek';
import { MatchResponse } from '@/types/match';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import React from 'react';

type TeamIdToIndexMap = {
  [key: string]: number;
};

type PlayerGoalsMap = {
  [key: string]: {
    name: string;
    goals: number;
  };
};

type TeamPointsMap = {
  [key: string]: {
    name: string;
    points: number;
  };
};

const WeekDetails: React.FC = () => {
  const { weekId } = useParams();
  const { week, isLoading, isError } = useWeek(weekId as string);
  console.log("🚀 ~ week:", week)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  const teamIdToIndexMap: TeamIdToIndexMap = {};
  week?.teams.forEach((team, index) => {
    teamIdToIndexMap[team.id] = index + 1;
  });

  const uniqueMatches: MatchResponse[] = [];
  const matchIds = new Set();

  week?.teams.flatMap((team) => team.matchesHome.concat(team.matchesAway)).forEach((match) => {
    if (!matchIds.has(match.id)) {
      uniqueMatches.push(match);
      matchIds.add(match.id);
    }
  });

  const playerGoalsMap: PlayerGoalsMap = {};
  uniqueMatches.forEach((match) => {
    match.goals.forEach((goal) => {
      if (!playerGoalsMap[goal.player.id]) {
        playerGoalsMap[goal.player.id] = { name: goal.player.name, goals: 0 };
      }
      playerGoalsMap[goal.player.id].goals += goal.goals;
    });
  });

  const teamPointsMap: TeamPointsMap = {};
  week?.teams.forEach(team => {
    teamPointsMap[team.id] = { name: `Time ${teamIdToIndexMap[team.id]}`, points: 0 };
  });

  uniqueMatches.forEach((match) => {
    const homeGoals = match.result ? match.result.homeGoals : 0;
    const awayGoals = match.result ? match.result.awayGoals : 0;

    if (homeGoals > awayGoals) {
      teamPointsMap[match.homeTeamId].points += 3;
    } else if (homeGoals < awayGoals) {
      teamPointsMap[match.awayTeamId].points += 3;
    } else {
      teamPointsMap[match.homeTeamId].points += 1;
      teamPointsMap[match.awayTeamId].points += 1;
    }
  });

  const teamRankings = Object.values(teamPointsMap).sort((a, b) => b.points - a.points);
  const topScorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals);

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Detalhes da Semana</h1>``
      <div className="min-w-[800px] p-6 bg-white h-full rounded-lg overflow-auto text-black flex flex-col gap-4">
        <p className='text-xl'>Data: {week?.date ? format(new Date(week.date), 'dd/MM/yy') : 'Data indisponível'}</p>
        <h3 className='text-xl'>Times da semana</h3>
        <ul className='flex flex-row gap-6'>
          {week?.teams.map((team, index) => (
            <li key={team.id} className='flex flex-col gap-2'>
              <h4 className='text-lg'>Time {index + 1}</h4>
              <ul className='flex flex-col gap-1'>
                {team.players.map(player => (
                  <li key={player.id}>{player.player.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className='flex flex-row gap-36'>
          <div>
            <h3 className='text-lg'>Partidas</h3>
            <ul className='flex flex-col gap-2'>
              {uniqueMatches.map((match, index) => (
                <li key={match.id} className='flex flex-col gap-2'>
                  <div className='flex flex-row gap-2 items-center'>
                    <h4 className='text-lg'>Partida {index + 1}</h4>
                    <p>Time {teamIdToIndexMap[match.homeTeamId]} {match.result?.homeGoals}</p>
                    <span> X </span>
                    <p> {match?.result?.awayGoals} Time {teamIdToIndexMap[match?.awayTeamId]}</p>
                  </div>
                  <div className='flex flex-row gap-2 items-center'>
                    <h5>Gols:</h5>
                    <ul className='flex flex-col gap-2'>
                      {match.goals.map(goal => (
                        <li key={goal.id}>
                          {goal.player.name} - {goal?.goals} gol(s)
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-8'>
            <div>
              <h3 className='text-lg'>Artilheiros</h3>
              {topScorers.map((player, index) => (
                <ol key={index}>
                  <li>{player.name} - {player.goals}</li>
                </ol>
              ))}
            </div>
            <div>
              <h3 className='text-lg'>Classificação</h3>
              {teamRankings.map((team, index) => (
                <ol key={index}>
                  <li>{team.name} - {team.points} pontos</li>
                </ol>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekDetails;
