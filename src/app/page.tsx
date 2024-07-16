'use client'

import { useState } from "react";
import { calculateTeamOverall, hillClimbing } from "@/utils/createTeam";
import Field from "@/components/Field";
import PlayerMock from "@/utils/mockPlayers";
import Select from 'react-select';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { Team } from "@/types/team";
import { Player } from "@/types/player";

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [quantityTeams, setQuantityTeams] = useState<number | null>(null);
  const [showOverall, setShowOverall] = useState(true);
  const [firstPlayerToTrade, setFirstPlayerToTrade] = useState<Player | null>(null);
  const [secondPlayerToTrade, setSecondPlayerToTrade] = useState<Player | null>(null);

  const handleGenerateTeams = () => {
    if (!quantityTeams) {
      console.log("Selecione a quantidade de times.");
      return;
    }

    const result = hillClimbing(selectedPlayers, quantityTeams, 10000);
    setTeams(result);
  };

  const handleTradePlayersBetweenTeams = () => {
    if (!firstPlayerToTrade || !secondPlayerToTrade) {
      console.log("Selecione ambos os jogadores para a troca.");
      return;
    }

    const firstPlayerCurrentTeam = teams.find(team =>
      team.players.some(player => player.name === firstPlayerToTrade.name)
    );

    const secondPlayerCurrentTeam = teams.find(team =>
      team.players.some(player => player.name === secondPlayerToTrade.name)
    );

    if (!firstPlayerCurrentTeam || !secondPlayerCurrentTeam) {
      console.log("Ambos os jogadores devem estar em times diferentes.");
      return;
    }

    const firstPlayerTeamIndex = teams.findIndex(team => team === firstPlayerCurrentTeam);
    const secondPlayerTeamIndex = teams.findIndex(team => team === secondPlayerCurrentTeam);

    const updatedFirstPlayerTeam = {
      ...firstPlayerCurrentTeam,
      players: firstPlayerCurrentTeam.players.filter(player => player.name !== firstPlayerToTrade.name)
    };
    const updatedSecondPlayerTeam = {
      ...secondPlayerCurrentTeam,
      players: secondPlayerCurrentTeam.players.filter(player => player.name !== secondPlayerToTrade.name)
    };

    updatedFirstPlayerTeam.players.push(secondPlayerToTrade);
    updatedSecondPlayerTeam.players.push(firstPlayerToTrade);

    const updatedTeams = [...teams];
    updatedTeams[firstPlayerTeamIndex] = updatedFirstPlayerTeam;
    updatedTeams[secondPlayerTeamIndex] = updatedSecondPlayerTeam;

    setTeams(updatedTeams);
  };

  const data = PlayerMock();

  const quantityTeamsData = [
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const availablePlayers = data.filter(player => !selectedPlayers.some(selected => selected.name === player.name));


  return (
    <>
      <div className="min-h-screen h-full bg-[#212121] p-12">
        <p className="text-3xl text-center mb-9 text-white">Gerador de equipes</p>
        <div className="flex flex-col gap-12 text-black">
          <div className="flex flex-col items-center space-y-4">
          <Select
            isMulti
            options={availablePlayers.map(player => ({ label: player.name, value: player }))}
            value={selectedPlayers.map(player => ({ label: player.name, value: player }))}
            onChange={(selectedOptions) => setSelectedPlayers(selectedOptions.map((option: {
              label: string;
              value: Player;
          }) => option.value))}
          />
            <span className="text-white">Jogadores selecionados: {selectedPlayers.length}</span>
            <div>
              <input type="checkbox" id="showOverall" name="ShowOverall" checked={showOverall} onChange={() => setShowOverall(!showOverall)} />
              <label className="text-xl text-center text-white ml-2" htmlFor="ShowOverall">Mostrar Overall</label>
              <Select
                options={quantityTeamsData}
                value={quantityTeamsData.find(option => option.value === quantityTeams) || null}
                onChange={(selectedOption) => setQuantityTeams(selectedOption?.value || null)}
              />
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
                  value={firstPlayerToTrade ? { label: firstPlayerToTrade.name, value: firstPlayerToTrade } : null}
                  onChange={(option) => setFirstPlayerToTrade(option ? option.value : null)}
                  options={selectedPlayers.map(player => ({ label: player.name, value: player }))}
                  placeholder="Selecione o primeiro jogador para troca"
                />
                <MultipleStopIcon className="text-white" />
                <Select
                  value={secondPlayerToTrade ? { label: secondPlayerToTrade.name, value: secondPlayerToTrade } : null}
                  onChange={(option) => setSecondPlayerToTrade(option ? option.value : null)}
                  options={selectedPlayers.map(player => ({ label: player.name, value: player }))}
                  placeholder="Selecione o segundo jogador para troca"
                />

                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleTradePlayersBetweenTeams}>
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
                <Field team={team} showOverall={showOverall} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
