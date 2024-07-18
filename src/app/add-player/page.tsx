'use client'

import CountrySelect, { CountryOption } from "@/components/CountrySelect";
import PlayerCard from "@/components/PlayerCard";
import TextInput from "@/components/TextInput";
import { formToPlayerMapper } from "@/mapper/formToPlayerMapper";
import { playerGetOverallSchema } from "@/schema/player";
import { Player, PlayerGetOverallFormData } from "@/types/player";
import { calculateOverall } from "@/utils/calculateOverall";
import countryOptions from "@/utils/countryOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { SingleValue } from 'react-select';

export default function AddPlayersPage() {
  const {
    control,
    watch,
    handleSubmit,
  } = useForm<PlayerGetOverallFormData>({
    resolver: zodResolver(playerGetOverallSchema),
  });

  const overallWatcher = watch('overall');
  const positionWatcher = watch('position');
  const playerDataWatcher = watch();
  const [playerData,setPlayerData] = useState<Player | null>(null)

  const positionOptions = [
    { label: 'ATK', value: 'ATK' },
    { label: 'MEI', value: 'MEI' },
    { label: 'DEF', value: 'DEF' },
    { label: 'GOL', value: 'GOL' }
  ];

  const handleCalculateOverall = () => {
    const overallValue = calculateOverall({ overall: overallWatcher, position: positionWatcher });
    const formData = formToPlayerMapper(playerDataWatcher,overallValue)
    setPlayerData(formData)
};

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9">Adicionar Jogador</h1>
      <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg w-full text-black ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 max-w-[300px]">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput label="*Nome" value={value} onChange={onChange} />
              )}
            />
            <div>
              <span>*Posição</span>
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <Select
                    options={positionOptions}
                    value={positionOptions.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value || '');
                    }}
                  />
                )}
              />
            </div>
          </div>
            <div>
            <label>País</label>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <CountrySelect
                    value={countryOptions.find(option => option.value === field.value) || null}
                    onChange={(selectedOption: SingleValue<CountryOption>) => {
                      field.onChange(selectedOption?.value || '');
                    }}
                  />
                )}
              />
            </div>
          <div className="flex flex-row max-w-[300px] mt-4 gap-4 justify-between">
            <div className="flex flex-col gap-1">
              <Controller
                control={control}
                name="overall.pace"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Velocidade" value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="overall.shooting"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Chute" value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="overall.passing"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Passe" value={value} onChange={onChange} />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Controller
                control={control}
                name="overall.dribble"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Drible" value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="overall.defense"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Defesa" value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="overall.physics"
                render={({ field: { onChange, value } }) => (
                  <TextInput label="*Físico" value={value} onChange={onChange} />
                )}
              />
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleCalculateOverall}
          >
            Calcular Overall
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Salvar Jogador
          </button>
        </form>
        {
          playerData && <PlayerCard playerData={playerData} />
        }
      </div>
    </div>
  );
}
