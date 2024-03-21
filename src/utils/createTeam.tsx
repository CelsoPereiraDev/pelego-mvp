export interface Player {
    name: string;
    overall: number;
    position: string;
}

export interface Team {
    players: Player[];
    overall: number;
}

// Função para calcular a pontuação total de um time
function calculateTeamScore(team: Player[]): number {
    return team.reduce((total, player) => total + player.overall, 0);
}

function calculateTeamOverall(team: Player[]): number {
    const totalOverall = team.reduce((total, player) => total + player.overall, 0);
    const numberOfPlayers = team.length;
    if (numberOfPlayers === 0) {
        return 0; // Evita a divisão por zero
    }
    const averageOverall = totalOverall / numberOfPlayers;
    return Math.round(averageOverall);
}


// Função para distribuir os jogadores entre os times de forma equilibrada
export function distributePlayers(data: Player[], quantityOfTeams: number): Team[] {
    // Calcular o número de jogadores por time
    const playersPerTeam = Math.floor(data.length / quantityOfTeams);
    
    // Inicializar os times
    const teams: Player[][] = new Array(quantityOfTeams).fill([]).map(() => []);

    // Ordenar os jogadores pelo overall
    data.sort((a, b) => b.overall - a.overall);

    // Distribuir os jogadores
    for (let i = 0; i < data.length; i++) {
        const player = data[i];
        // Encontrar o time com menor pontuação atual
        const smallestTeamIndex = teams.reduce((prevIndex, currentTeam, currentIndex) => {
            return calculateTeamScore(currentTeam) < calculateTeamScore(teams[prevIndex]) ? currentIndex : prevIndex;
        }, 0);
        // Adicionar o jogador ao time com menor pontuação
        teams[smallestTeamIndex].push(player);
    }

    // Calcular a pontuação total de cada time e retornar os times com seus overalls
    return teams.map(team => ({
        players: team,
        overall: calculateTeamOverall(team)
    }));
}
