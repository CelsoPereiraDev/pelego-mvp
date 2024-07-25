'use client';

import { MatchForm } from '@/components/MatchForm';
import { mapFormDataToBackend } from '@/mapper/createMatches';
import { useCreateMatches } from '@/services/matchs/useCreateMatch';

import { useCreateWeekWithTeams } from '@/services/matchs/useCreateWeekWithTeams';
import { usePlayers } from '@/services/player/usePlayers';
import { Player } from '@/types/player';
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
      }[];
    };
    awayGoals: {
      goalsCount: string;
      whoScores: {
        goals: number;
        playerId: string;
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
  const [createdTeams, setCreatedTeams] = useState<{ id: string }[]>([]);
  const [weekId, setWeekId] = useState<string | null>(null);
  const selectedPlayers = useWatch({ control, name: 'teams' }).flatMap((team: { players: string[] }) => team.players);
  const { players, isLoading } = usePlayers();
  const { fields: teamFields, append: appendTeam, update: updateTeam } = useFieldArray({
    control,
    name: 'teams'
  });

  const { fields: matchFields, append: appendMatch } = useFieldArray({
    control,
    name: 'matches'
  });
  const { createWeek } = useCreateWeekWithTeams();
  const { createNewMatches } = useCreateMatches();

  const handleCreateTeams: SubmitHandler<CreateMatch> = async data => {
    try {
      const weekData = {
        date: data.date,
        teams: data.teams.map(team => team.players)
      };

      console.log("Creating week with data:", weekData);
      const result = await createWeek(weekData);
      console.log("Week created:", result);

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
  console.log("🚀 ~ data:", data)
  try {
    if (!weekId) {
      throw new Error("Week ID must be set before creating matches.");
    }

    // Pass the created teams and weekId to the mapper
    const { matchesData } = mapFormDataToBackend(data, createdTeams, weekId);
    console.log("Matches data to be created:", matchesData);

    const createdMatches = await createNewMatches({ matches: matchesData });
    console.log('Matches created:', createdMatches);

    alert('Matches created successfully!');
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
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg overflow-auto text-black">
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
                  <h3>Team {index + 1}</h3>
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
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded my-4" onClick={handleAddTeam}>Adicionar Time</button>
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Cadastrar Times</button>
        </form>

        <form onSubmit={handleSubmit(handleCreateMatches)}>
          <div className="flex flex-col gap-8 mt-8">
            {matchFields.map((match, index) => (
              <MatchForm key={match.id} index={index} control={control} teamFields={teamFields} players={players} />
            ))}
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddMatch}>
              Adicionar Partida
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Cadastrar Partidas</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWeekAndMatchesForm;
