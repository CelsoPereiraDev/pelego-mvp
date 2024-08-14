'use client'

import Field from "@/components/Field";
import SelectWithSearch from "@/components/SelectWithSearch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { usePlayers } from "@/services/player/usePlayers";
import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { calculateTeamOverall, hillClimbing } from "@/utils/createTeam";
import AutoModeIcon from '@mui/icons-material/AutoMode';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { useState } from "react";
import Select from 'react-select';

export default function Home() {
  const { players } = usePlayers()
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

  const data = players;

  const quantityTeamsData = [
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const availablePlayers = data?.filter(player => !selectedPlayers.some(selected => selected.name === player.name));


  return (
    <>
      <div className="min-h-screen h-full bg-[#09090B] p-12">
        <p className="text-3xl text-center mb-9 text-white">Gerador de equipes</p>
        <div className="flex flex-col gap-12 text-black">
          <div className="flex flex-col items-center space-y-4">
          <SelectWithSearch
            isMulti
            placeholder='Jogadores'
            options={availablePlayers?.map(player => ({ label: player.name, value: player }))}
            value={selectedPlayers.map(player => ({ label: player.name, value: player }))}
            onChange={(selectedOptions) => setSelectedPlayers(selectedOptions.map((option: {
              label: string;
              value: Player;
          }) => option.value))}
          />
            <span className="text-white">Jogadores selecionados: {selectedPlayers.length}</span>
            <div>
              <div className="flex flex-row gap-2 items-center m-2">
                <Checkbox id="terms" onCheckedChange={() => setShowOverall(!showOverall)} defaultChecked />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white mt-1"
                  >
                    Mostrar Overall
                  </label>
              </div>
                <SelectWithSearch
                  placeholder="Qtd de times"
                  options={quantityTeamsData}
                  value={quantityTeamsData.find(option => option.value === quantityTeams) || null}
                  onChange={(selectedOption) => setQuantityTeams(selectedOption?.value || null)}
                />
            </div>
            <Button variant={"default"} onClick={handleGenerateTeams}> <AutoModeIcon className="mr-2 h-4 w-4"/>Gerar Times</Button>
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
                <Button variant={"default"} onClick={handleTradePlayersBetweenTeams}>Trocar Jogadores</Button>
              </>
            )}
          </div>
           <div className="flex flex-row items-center space-x-2 w-full justify-around self-center flex-wrap">
          {teams.map((team, index) => (
          <Card  key={index}>
          <CardHeader>
            <CardTitle>Time {index + 1}</CardTitle>
            <CardDescription>Overall: {calculateTeamOverall(team.players)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Field team={team} showOverall={showOverall} />
          </CardContent>
        </Card>
        ))}
        </div>
         
            
              
        </div>
        
      </div>
    </>
  );
}
