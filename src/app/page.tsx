'use client'

import { useState } from "react";
import { calculateTeamOverall, hillClimbing, Player, Team } from "@/utils/createTeam";
import Field from "@/components/Field";
import PlayerMock from "@/utils/mockPlayers";
import Select from 'react-select'
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [showOverall, setShowOverall] = useState(true);
  const [firstPlayerToTrade, setFirstPlayerToTrade] = useState<Player[]>([]);
  const [secondPlayerToTrade, setSecondPlayerToTrade] = useState<Player[]>([]);
  

  const handleGenerateTeams = () => {
    const result = hillClimbing(selectedPlayers, 3, 5000);
    setTeams(result);
  };

  const handleTradePlayersBetweenTeams = () => {
    const firstPlayerCurrentTeam = teams.find(team =>
      team.players.some(player => player.name === firstPlayerToTrade.value.name)
    );
  
    const secondPlayerCurrentTeam = teams.find(team =>
      team.players.some(player => player.name === secondPlayerToTrade.value.name)
    );
  
    if (!firstPlayerCurrentTeam || !secondPlayerCurrentTeam) {
      console.log("Ambos os jogadores devem estar em times diferentes.");
      return;
    }
  
    const firstPlayerTeamIndex = teams.findIndex(team => team === firstPlayerCurrentTeam);
    const secondPlayerTeamIndex = teams.findIndex(team => team === secondPlayerCurrentTeam);

    let updatedFirstPlayerTeam = {
      ...firstPlayerCurrentTeam,
      players: firstPlayerCurrentTeam.players.filter(player => player.name !== firstPlayerToTrade.value.name)
    };
    let updatedSecondPlayerTeam = {
      ...secondPlayerCurrentTeam,
      players: secondPlayerCurrentTeam.players.filter(player => player.name !== secondPlayerToTrade.value.name)
    };

    updatedFirstPlayerTeam.players.push(secondPlayerToTrade.value);
    updatedSecondPlayerTeam.players.push(firstPlayerToTrade.value);

    const updatedTeams = [...teams];
    updatedTeams[firstPlayerTeamIndex] = updatedFirstPlayerTeam;
    updatedTeams[secondPlayerTeamIndex] = updatedSecondPlayerTeam;
  
    setTeams(updatedTeams);
  };
  

  const data: Player[] = PlayerMock();

  return (
    <>
      <div className="min-h-screen h-full bg-[#212121] p-12">
        <p className="text-3xl text-center mb-9">Gerador de equipes</p>
        <div className="flex flex-col gap-12 text-black  ">
          <div className="flex flex-col items-center space-y-4">
            <Select
              isMulti
              options={data}
              value={selectedPlayers}
              onChange={(selectedOptions: any) => setSelectedPlayers(selectedOptions)}
            />
            <span className="text-white">Jogadores selecionados: {selectedPlayers.length}</span>         
            <div>
              <input type="checkbox" id="showOverall" name="ShowOverall" checked={showOverall} onChange={() => setShowOverall(!showOverall)}/>
              <label className="text-xl text-center text-white ml-2" htmlFor="ShowOverall">Mostrar Overall</label>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleGenerateTeams}>
              Gerar Times
            </button>
            {teams.length !== 0 && (
              <> 
                <div className="flex flex-row gap-4 items-center">
                <Select
                    value={firstPlayerToTrade}
                    onChange={(option: any) => setFirstPlayerToTrade(option)}
                    options={selectedPlayers.map(player => ({ label: player.name, value: player }))}
                    placeholder="Selecione o primeiro jogador para troca"
                  />
                  <MultipleStopIcon className="text-white"/>
                  <Select
                    value={secondPlayerToTrade}
                    onChange={(option: any) => setSecondPlayerToTrade(option)}
                    options={selectedPlayers.map(player => ({ label: player.name, value: player }))}
                    placeholder="Selecione o segundo jogador para troca"
                  />
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleTradePlayersBetweenTeams}
                  >
                  Trocar Jogadores
                </button>
              </>
            )}
          </div>
          <div className="flex flex-row items-center space-x-2 w-full justify-around max-w-[1900px] self-center flex-wrap">
            {teams.map((team, index) => (
              <div key={index} className="p-2 pb-8 my-2 bg-white text-black w-fit rounded-lg min-w-[360px]">
                <div className="flex flex-row justify-center w-full gap-8">
                <p className="mb-2 text-center">Time {index + 1}</p>
                <p className="mb-2 text-center">Overall: {calculateTeamOverall(team.players)}</p>
                </div>
                <Field team={team} showOverall={showOverall}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


