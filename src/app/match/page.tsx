'use client';

import { MatchForm } from '@/components/MatchForm';
import { mapFormDataToBackend } from '@/mapper/createMatches';
import { useCreateMatches } from '@/services/matchs/useCreateMatch';

import { useCreateWeekWithTeams } from '@/services/matchs/useCreateWeekWithTeams';
import { usePlayers } from '@/services/player/usePlayers';
import { useTeams } from '@/services/teams/useTeams';
import { Player } from '@/types/player';
import { Save } from '@mui/icons-material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';

export type CreateMatch = {
  date: string;
  teams: {
    players: string[];
  }[];
  matches: {
    homeTeamId: string;
    homeGoals: {
      goalsCount: string;
      whoScores: {
        goals: number;
        playerId: string;
        ownGoalPlayerId?: string;
      }[];
    };
    awayGoals: {
      goalsCount: string;
      whoScores: {
        goals: number;
        playerId: string;
        ownGoalPlayerId?: string;
      }[];
    };
    awayTeamId: string;
  }[];
};

const getAvailablePlayers = (allPlayers: Player[], selectedPlayers: string[]) => {
  return allPlayers.filter(player => !selectedPlayers.includes(player.id));
};

const CreateWeekAndMatchesForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateMatch>({
    defaultValues: {
      teams: [{ players: [] }, { players: [] }]
    }
  });
  const [createdTeams, setCreatedTeams] = useState<{
    players: any; id: string 
  }[]>([]);

  const [weekId, setWeekId] = useState<string | null>(null);
  const selectedPlayers = useWatch({ control, name: 'teams' }).flatMap((team: { players: string[] }) => team.players);
  const { players, isLoading } = usePlayers();
  const { fields: teamFields, append: appendTeam, update: updateTeam } = useFieldArray({
    control,
    name: 'teams'
  });

  const { fields: matchFields, append: appendMatch, remove: removeMatch } = useFieldArray({
    control,
    name: 'matches'
  });
  const { createWeek } = useCreateWeekWithTeams();
  const { createNewMatches } = useCreateMatches();
  const { update } = useTeams();


  const handleCreateTeams: SubmitHandler<CreateMatch> = async data => {
  try {
    const weekData = {
      date: data.date,
      teams: data.teams.map(team => team.players)
    };

    const result = await createWeek(weekData);

    if (!result.createdTeams || result.createdTeams.length === 0) {
      throw new Error("No teams were created");
    }

    setCreatedTeams(result.createdTeams);
    setWeekId(result.week.id);

    alert('Teams created successfully! Now you can create matches.');
  } catch (error) {
    console.error('Error creating teams:', error);
    alert('Failed to create teams');
  }
  };


  const handleCreateMatches: SubmitHandler<CreateMatch> = async data => {
    try {
      if (!weekId) {
        throw new Error("Week ID must be set before creating matches.");
      }

      const { matchesData } = mapFormDataToBackend(data, createdTeams, weekId);
      const createdMatchesResponse = await createNewMatches({ matches: matchesData });
      

      const createdMatches = createdMatchesResponse.createdMatches;
      if (!Array.isArray(createdMatches)) {
        throw new Error("Expected createdMatches to be an array, but got:", createdMatches);
      }
      

      const teamPoints: Record<string, number> = {};

      createdMatches.forEach(match => {
        const { homeTeamId, awayTeamId, result } = match;
        

        if (!teamPoints[homeTeamId]) {
          teamPoints[homeTeamId] = 0;
        }
        if (!teamPoints[awayTeamId]) {
          teamPoints[awayTeamId] = 0;
        }

        const homeGoals = result?.homeGoals || 0;
        const awayGoals = result?.awayGoals || 0;

        

        if (homeGoals > awayGoals) {
          teamPoints[homeTeamId] += 3; // Vitória do time da casa
          
        } else if (homeGoals < awayGoals) {
          teamPoints[awayTeamId] += 3; // Vitória do time visitante
          
        } else {
          teamPoints[homeTeamId] += 1; // Empate
          teamPoints[awayTeamId] += 1; // Empate
          
        }
      });

      const pointsArray = Object.values(teamPoints);
      const maxPoints = Math.max(...pointsArray);
      const championTeams = Object.keys(teamPoints).filter(
        (team) => teamPoints[team] === maxPoints
      );
      
      const updatedTeams = createdTeams.map((team) => ({
        id: team.id,
        champion: championTeams.length === 1 && team.id === championTeams[0],
        points: teamPoints[team.id] || 0,
        players: team.players.map((player) => ({
          id: player.id,
          isChampion: championTeams.length === 1 && team.id === championTeams[0],
        })),
      }));
      
      await update(updatedTeams);

      alert('Matches created successfully! Champions of the week have been set.');
    } catch (error) {
      console.error('Error creating matches:', error);
      alert('Failed to create matches');
    }
  };

  const handleAddTeam = useCallback(() => {
    appendTeam({ players: [] });
  }, [appendTeam]);

  const handleAddMatch = useCallback(() => {
    appendMatch({
      homeTeamId: '',
      homeGoals: { goalsCount: '', whoScores: [] },
      awayGoals: { goalsCount: '', whoScores: [] },
      awayTeamId: ''
    });
  }, [appendMatch]);

  const availablePlayers = useMemo(() => {
    return players ? getAvailablePlayers(players, selectedPlayers) : [];
  }, [players, selectedPlayers]);

  if (isLoading) return <div>Loading players...</div>;

  return (
    <div className="min-h-screen bg-[#333333] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <div className="max-w-[1440px] p-6 bg-white min-h-full rounded-lg overflow-auto text-black">
        <form onSubmit={handleSubmit(handleCreateTeams)}>
          <div>
            <label className='mr-4'>Data</label>
            <input type="datetime-local" {...register('date', { required: true })} />
            {errors.date && <span>This field is required</span>}
          </div>

          <div>
            <label>Times</label>
            <div className="flex flex-row gap-4 items-center mt-4">
              {teamFields.map((team, index) => (
                <div key={team.id} className="flex flex-row gap-4 items-center">
                  <h3>Time {index + 1}</h3>
                  <Controller
                    control={control}
                    name={`teams.${index}.players`}
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={availablePlayers.map(player => ({ label: player.name, value: player.id }))}
                        value={field.value.map(playerId => players?.find(player => player.id === playerId)).filter(Boolean).map(player => ({ label: player?.name, value: player?.id }))}
                        onChange={(selectedOptions) => {
                          const selectedPlayerIds = selectedOptions.map(option => option.value).filter(Boolean) as string[];
                          field.onChange(selectedPlayerIds);
                          updateTeam(index, { players: selectedPlayerIds });
                        }}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
            <div className='flex flex-row gap-4 my-4'>
              <button type="button" className="px-4 py-2 bg-[#4D7133] text-white rounded flex flex-row gap-2 items-center justify-center w-56" onClick={handleAddTeam}><GroupAddIcon/>Adicionar Time</button>
              <button type="submit" className="px-4 py-2 bg-white border-[1px] border-[#4D7133] text-[#4D7133] rounded flex flex-row gap-2 items-center w-56 justify-center"><QueuePlayNextIcon/>Cadastrar Times</button>
            </div>
        </form>

        <form onSubmit={handleSubmit(handleCreateMatches)}>
          <div className="flex flex-col gap-4 mt-8">
            {matchFields.map((match, index) => (
              <MatchForm key={match.id} index={index} control={control} teamFields={teamFields} players={players}  removeMatch={removeMatch}/>
            ))}
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <button type="button" className="px-4 py-2 bg-[#4D7133] text-white rounded flex flex-row gap-2 items-center justify-center w-56" onClick={handleAddMatch}>
              <ScoreboardIcon/>Adicionar Partida
            </button>
            <button type="submit" className="px-4 py-2 bg-white border-[1px] border-[#4D7133] text-[#4D7133] rounded flex flex-row gap-2 items-center w-56 justify-center"><Save/>Cadastrar Partidas</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWeekAndMatchesForm;
