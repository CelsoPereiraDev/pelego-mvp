'use client'

import { useState } from "react";
import { calculateTeamOverall, hillClimbing, Player, Team } from "@/utils/createTeam";
import Field from "@/components/Field";
import PlayerMock from "@/utils/mockPlayers";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleGenerateTeamsWithMock = () => {
    const result = hillClimbing(data, 3, 5000);
    setTeams(result);
  };

  const handleGenerateTeams = () => {
    const players: Player[] = inputValue
      .split(/[\n,]/)
      .map((entry) => {
        const [name, overall] = entry.split(":").map((item) => item.trim());
        return { name, overall: { overall:parseInt(overall) || 0 } };
      });
    
    const result = hillClimbing(players, 3, 5000);
    setTeams(result);
  };

  const data: Player[] = PlayerMock();


  return (
    <>
      <div className="h-100% bg-[#212121] p-12">
        <p className="text-3xl text-center mb-9">Gerador de equipes</p>
        <div className="flex flex-col gap-12 text-black  ">
          <div className="flex flex-col items-center space-y-4">
            <textarea
              className="p-2 border rounded min-h-[480px] min-w-[480px]"
              placeholder="Digite os jogadores no formato nome:nota separados por vírgula ou pular linha"
              rows={5}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleGenerateTeams}
            >
              Gerar Times
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleGenerateTeamsWithMock}
            >
              Gerar Times com Mock
            </button>
          </div>
          <div className="flex flex-row items-center space-x-4 w-full justify-around">
            {teams.map((team, index) => (
              <div key={index} className="p-4 my-4 bg-white text-black w-fit rounded-lg min-w-[360px]">
                <p className="mb-4 text-center">Time {index + 1}</p>
                <p className="mb-2 text-center">Overall: {calculateTeamOverall(team.players)}</p>
                <Field team={team} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


