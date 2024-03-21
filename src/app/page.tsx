'use client'
import '@/app/globals.css'
import { useEffect, useState } from "react";
import { distributePlayers, Player, Team } from "@/utils/createTeam";


const data: Player[] = [
  { "name": "2008", "overall": 28, "position": "Midfielder" },
  { "name": "Adriano", "overall": 49, "position": "Midfielder" },
  { "name": "Bolsonaro", "overall": 53, "position": "Forward" },
  { "name": "Celso", "overall": 77, "position": "Defender" },
  { "name": "Danniboy", "overall": 79, "position": "Goalkeeper" },
  { "name": "Daro", "overall": 78, "position": "Midfielder" },
  { "name": "Du", "overall": 53, "position": "Forward" },
  { "name": "Eric", "overall": 42, "position": "Midfielder" },
  { "name": "Fer", "overall": 59, "position": "Midfielder" },
  { "name": "Gabriel", "overall": 59, "position": "Defender" },
  { "name": "Gabrielzinho", "overall": 54, "position": "Forward" },
  { "name": "Guilherme", "overall": 27, "position": "Forward" },
  { "name": "Gustavo", "overall": 55, "position": "Midfielder" },
  { "name": "Igor", "overall": 55, "position": "Midfielder" },
  { "name": "João", "overall": 87, "position": "Defender" },
  { "name": "João da Radio", "overall": 37, "position": "Forward" },
  { "name": "João Primo", "overall": 65, "position": "Midfielder" },
  { "name": "Leo", "overall": 41, "position": "Defender" },
  { "name": "Matheus", "overall": 63, "position": "Goalkeeper" },
  { "name": "Preto", "overall": 90, "position": "Forward" },
  { "name": "Tcharlly", "overall": 58, "position": "Midfielder" }
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
        <div key={index} className="p-4  my-4 bg-white text-black w-fit rounded-lg min-w-[360px]">
          <p className='mb-4 text-center'>Time {index + 1} Overall:{team.overall}</p>
          <ul>
            {team.players.map((player, playerIndex) => ( 
              <li key={playerIndex}>
                {player.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
