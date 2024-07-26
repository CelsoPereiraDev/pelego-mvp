import { CreateMatch } from "@/app/match/page";
import { PlayerResponse } from "@/types/player";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldArrayWithId, useWatch } from "react-hook-form";
import Select from "react-select";

interface MatchFormProps {
  index: number;
  control: Control<CreateMatch>;
  teamFields: FieldArrayWithId<CreateMatch, "teams", "id">[];
  players: PlayerResponse[];
}

export const MatchForm = ({ index, control, teamFields, players }: MatchFormProps) => {
  const homeTeamId = useWatch({ control, name: `matches.${index}.homeTeamId` });
  const awayTeamId = useWatch({ control, name: `matches.${index}.awayTeamId` });
  const homeGoals = useWatch({ control, name: `matches.${index}.homeGoals.goalsCount` });
  const awayGoals = useWatch({ control, name: `matches.${index}.awayGoals.goalsCount` });

  const homePlayersForTeam = useMemo(() => {
    return teamFields[parseInt(homeTeamId)]?.players || [];
  }, [homeTeamId, teamFields]);

  const awayPlayersForTeam = useMemo(() => {
    return teamFields[parseInt(awayTeamId)]?.players || [];
  }, [awayTeamId, teamFields]);

  const teamsOptions = useMemo(() => {
    return teamFields.map((team, idx) => ({
      label: `Time ${idx + 1}`,
      value: idx.toString(),
    }));
  }, [teamFields]);

  const goalsOptions = Array.from({ length: 10 }, (_, i) => ({ label: i.toString(), value: i.toString() }));

  const [homeGoalsInputs, setHomeGoalsInputs] = useState<number[]>([]);
  const [awayGoalsInputs, setAwayGoalsInputs] = useState<number[]>([]);

  useEffect(() => {
    setHomeGoalsInputs(Array.from({ length: parseInt(homeGoals) || 0 }, (_, i) => i));
  }, [homeGoals]);

  useEffect(() => {
    setAwayGoalsInputs(Array.from({ length: parseInt(awayGoals) || 0 }, (_, i) => i));
  }, [awayGoals]);

  const playerOptions = (playerIds: string[]) => {
    return players
      .filter(player => playerIds.includes(player.id))
      .map(player => ({ label: player.name, value: player.id }));
  };

  return (
    <div className="flex flex-col items-start gap-4 w-[600px] border-[1px] border-[#4D7133] p-4 rounded-lg">
      <h3 className="my-auto text-[#333333]">Jogo {index + 1}</h3>
      <div className="flex flex-row items-start gap-4 max-w-[600px] w-full">
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-row items-center gap-2 w-full justify-between">
            <Controller
              control={control}
              name={`matches.${index}.homeTeamId`}
              render={({ field }) => (
                <Select
                  options={teamsOptions}
                  value={teamsOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                />
              )}
            />
            <div className="max-w-28">
              <Controller
                control={control}
                name={`matches.${index}.homeGoals.goalsCount`}
                render={({ field }) => (
                  <Select
                    options={goalsOptions}
                    value={goalsOptions.find((option) => option.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                  />
                )}
              />
            </div>
          </div>
            {homeGoalsInputs.map((_, goalIndex) => (
              <div key={`home-goal-${goalIndex}`} className="flex flex-row gap-2">
                <Controller
                  control={control}
                  name={`matches.${index}.homeGoals.whoScores.${goalIndex}.goals`}
                  render={({ field }) => (
                    <Select
                      options={goalsOptions}
                      value={goalsOptions.find((option) => option.value === String(field.value)) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`matches.${index}.homeGoals.whoScores.${goalIndex}.playerId`}
                  render={({ field }) => (
                    <Select
                      options={playerOptions(homePlayersForTeam)}
                      value={playerOptions(homePlayersForTeam).find(option => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                    />
                  )}
                />
              </div>
            ))}
        </div>
        <span className="my-auto text-[#333333]">X</span>
        <div className="flex flex-col items-start gap-2 max-w-52">
          <div className="flex flex-row items-center gap-2 w-full justify-between">
            <div className="max-w-28">
              <Controller
                  control={control}
                  name={`matches.${index}.awayGoals.goalsCount`}
                  render={({ field }) => (
                    <Select
                      options={goalsOptions}
                      value={goalsOptions.find((option) => option.value === field.value) || null}
                      onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                    />
                  )}
                />
            </div>
            <div className="">
              <Controller
              control={control}
              name={`matches.${index}.awayTeamId`}
              render={({ field }) => (
                <Select
                  options={teamsOptions}
                  value={teamsOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                />
              )}
            />
            </div>
          </div>
          {awayGoalsInputs.map((_, goalIndex) => (
            <div key={`away-goal-${goalIndex}`} className="flex flex-row gap-2">
              <Controller
                control={control}
                name={`matches.${index}.awayGoals.whoScores.${goalIndex}.goals`}
                render={({ field }) => (
                  <Select
                    options={goalsOptions}
                    value={goalsOptions.find((option) => option.value === String(field.value)) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                  />
                )}
              />
              <Controller
                control={control}
                name={`matches.${index}.awayGoals.whoScores.${goalIndex}.playerId`}
                render={({ field }) => (
                  <Select
                    options={playerOptions(awayPlayersForTeam)}
                    value={playerOptions(awayPlayersForTeam).find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchForm;
