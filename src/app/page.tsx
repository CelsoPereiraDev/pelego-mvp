'use client'

import { useState } from "react";
import { calculateTeamOverall, hillClimbing, Player, Team } from "@/utils/createTeam"; // Importa a função hillClimbing

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleGenerateTeams = () => {
    const players: Player[] = inputValue
      .split(/[\n,]/)
      .map((entry) => {
        const [name, overall] = entry.split(":").map((item) => item.trim());
        return { name, overall: parseInt(overall) || 0 };
      });
    const result = hillClimbing(players, 3, 1500);
    setTeams(result);
  };

  return (
    <div className="h-screen bg-[#212121] p-12">
      <p className="text-3xl text-center mb-9">Gerador de equipes</p>
      <div className="flex flex-row gap-12 text-black  ">
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
        </div>
        <div>
        {teams.map((team, index) => (
  <div key={index} className="p-4 my-4 bg-white text-black w-fit rounded-lg min-w-[360px]">
    <p className="mb-4 text-center">Time {index + 1}</p>
    <p className="mb-2 text-center">Pontuação Total: {calculateTeamOverall(team.players)}</p>
    <ul>
      {team.players.map((player, playerIndex) => (
        <li key={playerIndex}>{player.name}</li>
      ))}
    </ul>
  </div>
))}
        </div>
      </div>
    </div>
  );
}
