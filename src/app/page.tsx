'use client'

import { useEffect, useState } from "react";
import { distributePlayers, Player, Team } from "@/utils/createTeam";


const data: Player[] = [
  { name: "Lucas Silva", overall: 78, position: "Forward" },
  { name: "Gabriel Santos", overall: 68, position: "Midfielder" },
  { name: "Rafael Oliveira", overall: 82, position: "Defender" },
  { name: "Carlos Pereira", overall: 55, position: "Goalkeeper" },
  { name: "Matheus Costa", overall: 72, position: "Forward" },
  { name: "Felipe Almeida", overall: 63, position: "Midfielder" },
  { name: "Fernando Barbosa", overall: 79, position: "Defender" },
  { name: "Ricardo Nunes", overall: 58, position: "Goalkeeper" },
  { name: "Gustavo Silva", overall: 75, position: "Forward" },
  { name: "Pedro Mendes", overall: 65, position: "Midfielder" },
  { name: "André Santos", overall: 81, position: "Defender" },
  { name: "João Oliveira", overall: 52, position: "Goalkeeper" },
  { name: "Marcos Lima", overall: 70, position: "Forward" },
  { name: "Renato Fernandes", overall: 60, position: "Midfielder" },
  { name: "Bruno Oliveira", overall: 80, position: "Defender" },
  { name: "Rodrigo Costa", overall: 50, position: "Goalkeeper" },
  { name: "Daniel Alves", overall: 77, position: "Forward" },
  { name: "Jorge Santos", overall: 66, position: "Midfielder" },
  { name: "Leonardo Oliveira", overall: 83, position: "Defender" },
  { name: "Antônio Silva", overall: 56, position: "Goalkeeper" },
  { name: "Vinícius Mendonça", overall: 73, position: "Forward" }
];

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const result = distributePlayers(data, 3);
    setTeams(result);
  }, []);

  return (
    <>
      {teams.map((team, index) => (
        <div key={index}>
          <p>Time {index + 1} Overall:{team.overall}</p>
          <ul>
            {team.players.map((player, playerIndex) => ( 
              <li key={playerIndex}>
                {player.name} - Overall: {player.overall}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
