'use client'

import PlayerCard from "@/components/PlayerCard";
import TextInput from "@/components/TextInput";
import { calculateOverall } from "@/utils/calculateOverall";
import Select from 'react-select';
import { useState } from "react";
import { Player } from "@/types/player";

const initialPlayerData: Player = {
    name: "",
    overall: {
        pace: 0,
        shooting: 0,
        passing: 0,
        dribble: 0,
        defense: 0,
        physics: 0,
        overall: 0,
    },
    country: "",
    team: "",
    image: "",
    position: "",
    value: ""
};

export default function AddPlayersPage() {
    const [playerData, setPlayerData] = useState<Player>(initialPlayerData);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }, field: keyof Player, subfield?: keyof Player['overall']) => {
        const value = event.target.value;
        if (subfield) {
            setPlayerData(prevState => ({
                ...prevState,
                [field]: {
                    ...(prevState[field] as Player['overall']),
                    [subfield]: Number(value)
                }
            }));
        } else {
            setPlayerData(prevState => ({
                ...prevState,
                [field]: value
            }));
        }
    };
    
    
    
    const positionOptions = [
        {
            label: 'ATK',
            value: 'ATK',
        },
        {
            label: 'MEI',
            value: 'MEI',
        },
        {
            label: 'DEF',
            value: 'DEF',
        }
    ];

    return (
        <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
            <h1 className="text-3xl text-center mb-9">Adicionar Jogador</h1>
            <div className="max-w-[1440px] p-6 bg-white h-full rounded-lg w-full text-black ">
                <div>
                    <div className="flex flex-col gap-1 max-w-[300px]">
                        <TextInput label='*Nome' value={playerData.name} onChange={(e) => handleInputChange(e, 'name')} />
                        <TextInput label='*País' value={playerData.country} onChange={(e) => handleInputChange(e, 'country')} />
                        <div>
                            <span>*Posição</span>
                            <Select
                                options={positionOptions}
                                value={positionOptions.find(option => option.value === playerData.position) || null}
                                onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption?.value || '' } }, 'position')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row max-w-[300px] mt-4 gap-4 justify-between">
                        <div className="flex flex-col gap-1">
                            <TextInput label='*Velocidade' width="40px" value={playerData.overall.pace.toString()} onChange={(e) => handleInputChange(e, 'overall', 'pace')}/>
                            <TextInput label='*Chute' width="40px" value={playerData.overall.shooting.toString()} onChange={(e) => handleInputChange(e, 'overall', 'shooting')} />
                            <TextInput label='*Passe' width="40px" value={playerData.overall.passing.toString()} onChange={(e) => handleInputChange(e, 'overall', 'passing')} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <TextInput label='*Drible' width="40px" value={playerData.overall.dribble.toString()} onChange={(e) => handleInputChange(e, 'overall', 'dribble')}/>
                            <TextInput label='*Defesa' width="40px" value={playerData.overall.defense.toString()} onChange={(e) => handleInputChange(e, 'overall', 'defense')}/>
                            <TextInput label='*Físico' width="40px" value={playerData.overall.physics.toString()} onChange={(e) => handleInputChange(e, 'overall', 'physics')}/>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => {
                        const overallValue = calculateOverall({ position: playerData.position as "ATK" | "MEI" | "DEF", overall: playerData.overall });
                        setPlayerData(prevState => ({ ...prevState, overall: { ...prevState.overall, overall: overallValue } }));
                    }}>
                        Calcular Overall
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Salvar Jogador
                    </button>
                </div>
                <PlayerCard playerData={playerData} />
            </div>
        </div>
    );
}
