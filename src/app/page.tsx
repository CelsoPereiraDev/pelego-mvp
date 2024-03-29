'use client'

import { useState } from "react";
import { calculateTeamOverall, hillClimbing, Player, Team } from "@/utils/createTeam";
import Field from "@/components/Field";
import PlayerMock from "@/utils/mockPlayers";
import Select from 'react-select'

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleGenerateTeamsWithMock = () => {
    const result = hillClimbing(data, 3, 5000);
    setTeams(result);
  };

  const handleGenerateTeams = () => {
    const result = hillClimbing(selectedPlayers, 3, 5000);
    setTeams(result);
  };

  const data: Player[] = PlayerMock();

  return (
    <>
      <div className="h-screen bg-[#212121] p-12">
        <p className="text-3xl text-center mb-9">Gerador de equipes</p>
        <div className="flex flex-col gap-12 text-black  ">
          <div className="flex flex-col items-center space-y-4">
            <Select
              isMulti
              options={data}
              value={selectedPlayers}
              onChange={(selectedOptions: any) => setSelectedPlayers(selectedOptions)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleGenerateTeams}>
              Gerar Times
            </button>
          </div>
          <div className="flex flex-row items-center space-x-2 w-full justify-around">
            {teams.map((team, index) => (
              <div key={index} className="p-2 pb-8 my-2 bg-white text-black w-fit rounded-lg min-w-[360px]">
                <div className="flex flex-row justify-center w-full gap-8">
                <p className="mb-2 text-center">Time {index + 1}</p>
                <p className="mb-2 text-center">Overall: {calculateTeamOverall(team.players)}</p>
                </div>
                <Field team={team} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


