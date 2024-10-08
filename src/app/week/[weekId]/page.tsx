'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeek } from '@/services/weeks/useWeek';
import { MatchResponse } from '@/types/match';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
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

type OwnGoalsMap = {
  [key: string]: {
    name: string;
    ownGoals: number;
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
  const ownGoalsMap: OwnGoalsMap = {};
  uniqueMatches.forEach((match) => {
    match.goals.forEach((goal) => {
      if (goal.player) {
        if (!playerGoalsMap[goal.player.id]) {
          playerGoalsMap[goal.player.id] = { name: goal.player.name, goals: 0 };
        }
        playerGoalsMap[goal.player.id].goals += goal.goals;
      } else if (goal.ownGoalPlayer) {
        if (!ownGoalsMap[goal.ownGoalPlayer.id]) {
          ownGoalsMap[goal.ownGoalPlayer.id] = { name: goal.ownGoalPlayer.name, ownGoals: 0 };
        }
        ownGoalsMap[goal.ownGoalPlayer.id].ownGoals += goal.goals;
      }
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
  const ownGoalsList = Object.values(ownGoalsMap).sort((a, b) => b.ownGoals - a.ownGoals);

  const renderIconForTeam = (index: number) => {
    switch (index) {
      case 1:
        return <LooksOneIcon className='text-[hsl(var(--destructive))] min-h-9 min-w-9'/>;
      case 2:
        return <LooksTwoIcon className='text-[hsl(var(--foreground))] min-h-9 min-w-9' />;
      case 3:
        return <Looks3OutlinedIcon className='text-[hsl(var(--foreground))] min-h-9 min-w-9'/>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[hsl(var(--background))] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-[hsl(var(--foreground))]">Detalhes da Semana</h1>
      <Card className="min-w-[800px] p-6 h-full rounded-lg overflow-auto">
        <CardHeader>
          <CardTitle className="text-[hsl(var(--foreground))]">Data: {week?.date ? format(new Date(week.date), 'dd/MM/yy') : 'Data indisponível'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <h3 className="text-[hsl(var(--foreground))] text-xl">Times da semana</h3>
          <div className="flex flex-row justify-between">
            <ul className="flex flex-row gap-6">
              {week?.teams.map((team, index) => (
                <li key={team.id} className="flex flex-col gap-2">
                  <h4 className="text-lg flex items-center text-[hsl(var(--foreground))]">
                    Time {index + 1}
                  </h4>
                  <ul className="flex flex-col gap-1 text-[hsl(var(--muted-foreground))]">
                    {team.players.map(player => (
                      <li key={player.id}>{player.player.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="flex flex-row gap-8">
              <div>
                <h3 className="text-[hsl(var(--foreground))] text-lg">Artilheiros</h3>
                {topScorers.map((player, index) => (
                  <ol key={index} className="text-[hsl(var(--foreground))]">
                    <li>{player.name} - {player.goals}</li>
                  </ol>
                ))}
              </div>
              <div>
                <h3 className="text-[hsl(var(--foreground))] text-lg">Gols Contra</h3>
                {ownGoalsList.map((player, index) => (
                  <ol key={index} className="text-[hsl(var(--foreground))]">
                    <li>{player.name} - {player.ownGoals}</li>
                  </ol>
                ))}
              </div>
              <div>
                <h3 className="text-[hsl(var(--foreground))] text-lg">Classificação</h3>
                {teamRankings.map((team, index) => (
                  <ol key={index} className="text-[hsl(var(--foreground))]">
                    <li>{team.name} - {team.points} pontos</li>
                  </ol>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-36">
            <div>
              <ul className="grid grid-cols-5 gap-2">
                {uniqueMatches.map((match, index) => (
                  <li key={match.id} className="flex flex-col gap-2 border-[1px] rounded border-[hsl(var(--primary))] p-2">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-base text-[hsl(var(--foreground))]">Partida {index + 1}</h4>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          Time {teamIdToIndexMap[match.homeTeamId]} <span className='min-w-9 min-h-9'>{renderIconForTeam(teamIdToIndexMap[match.homeTeamId])}</span> <span className='text-base text-[hsl(var(--foreground))] font-extrabold'>{match.result?.homeGoals}</span>
                        </p>
                        <span className='text-xs text-[hsl(var(--muted-foreground))] font-extralight'> X </span>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          <span className='text-base text-[hsl(var(--foreground))] font-extrabold'>{match?.result?.awayGoals}</span> 
                          {renderIconForTeam(teamIdToIndexMap[match.awayTeamId])}
                          Time {teamIdToIndexMap[match?.awayTeamId]}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <ul className="flex flex-col gap-1">
                        {match.goals.map(goal => (
                          <li key={goal.id} className="text-xs text-[hsl(var(--muted-foreground))]">
                            {goal.player ? `${goal.player.name}` : `${goal.ownGoalPlayer?.name} (GC)`} - {goal.goals} gol(s)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeekDetails;
