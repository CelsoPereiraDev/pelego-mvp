import { calculateSimplePlayerStats } from "@/mapper/playerStatMapper";
import { WeekResponse } from "@/types/weeks";
import { calculateSimpleAssistStats } from "./calculateAssists";
import { calculateBestDefender } from "./calculateBestDefender";

interface PlayerResumeData {
 name: string
 count: number
}

export interface MonthResumeProps {
 assists: PlayerResumeData[]
 scorer: PlayerResumeData[]
 mvp: PlayerResumeData[]
 lvp: PlayerResumeData[]
 bestDefender: PlayerResumeData[]
 topPointer: PlayerResumeData[]
}

interface PlayerGoalsMap {
  [playerId: string]: {
    name: string;
    goals: number;
  };
}

export const calculateMonthResume = (weeks: WeekResponse[], playerToExclude?: string): MonthResumeProps => {

  // Função auxiliar para garantir no máximo 9 jogadores
  const ensureMaximumNinePlayers = (category: PlayerResumeData[]): PlayerResumeData[] => {
    return category.slice(0, 9);
  };

  // ASSISTÊNCIAS
  const assistPlayers = calculateSimpleAssistStats(weeks);
  assistPlayers.forEach(player => {
  console.log(`Jogador: ${player.name}, Partidas Jogadas:`, player);
});
  const sortedAssistPlayers = assistPlayers
  ?.filter(player => player.name !== playerToExclude)
  ?.sort((a, b) => {
    if (b.assists === a.assists) {
      // Critério de desempate: menor número de jogos
      return a.matchesPlayed - b.matchesPlayed;
    }
    return b.assists - a.assists;
  });

  const fifthElementAssists = sortedAssistPlayers[4]?.assists;
  const bestAssistents = sortedAssistPlayers.filter(player => player.assists >= fifthElementAssists);

  const assistsResume = ensureMaximumNinePlayers(bestAssistents.map((assistent) => {
    return {
      name: assistent.name,
      count: assistent.assists
    };
  }));

  // BEST DEFENDER
  const bestDefenderPlayers = calculateBestDefender(weeks);
  const justDefenders = bestDefenderPlayers
    ?.filter(player => 
      (player.position === 'DEF' || player.position === 'GOL') && 
      (player.weeksPlayed >= weeks.length * 0.5) &&
      player.playerName !== playerToExclude
    );
      console.log("🆑 ~ calculateMonthResume ~ weeks.length:", weeks)
    console.log("🆑 ~ calculateMonthResume ~ justDefenders:", justDefenders)
  const sortedBestDefenderPlayers = justDefenders?.sort((a, b) => a.averageGoalsConceded - b.averageGoalsConceded);
  console.log("🆑 ~ calculateMonthResume ~ sortedBestDefenderPlayers:", sortedBestDefenderPlayers)
  const fifthElementDefender = sortedBestDefenderPlayers[4]?.averageGoalsConceded ?? sortedBestDefenderPlayers[sortedBestDefenderPlayers.length - 1].averageGoalsConceded;

  const bestDefenders = sortedBestDefenderPlayers.filter(player => player.averageGoalsConceded <= fifthElementDefender);

  const defendersResume = ensureMaximumNinePlayers(bestDefenders.map((defender) => {
    return {
      name: defender.playerName,
      count: defender.averageGoalsConceded
    };
  }));
    console.log("🆑 ~ defendersResume ~ defendersResume:", defendersResume)

  // ARTILHEIRO
  const playerGoalsMap: PlayerGoalsMap = {};
  const processedMatches = new Set<string>();
  weeks?.forEach((week) => {
    week.teams.flatMap((team) => team.matchesHome.concat(team.matchesAway)).forEach((match) => {
      if (!processedMatches.has(match.id)) {
        processedMatches.add(match.id);

        match.goals.forEach((goal) => {
          if (goal.player && goal.player.name !== playerToExclude) {
            if (!playerGoalsMap[goal.player.id]) {
              playerGoalsMap[goal.player.id] = { name: goal.player.name, goals: 0 };
            }
            playerGoalsMap[goal.player.id].goals += goal.goals;
          }
        });
      }
    });
  });
  const topScorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals);
  const fifthElementScorer = topScorers[4]?.goals;
  const bestScorers = topScorers.filter(player => player.goals >= fifthElementScorer);

  const strikersResume = ensureMaximumNinePlayers(bestScorers.map((striker) => {
    return {
      name: striker.name,
      count: striker.goals
    };
  }));

  // TOP POINTER
  const pointStats = calculateSimplePlayerStats(weeks);
  const sortedtopPointersPlayers = pointStats
    ?.filter(player => player.name !== playerToExclude)
    ?.sort((a, b) => b.points - a.points);
  const fifthTopPointers = sortedtopPointersPlayers[4]?.points;
  const bestTopPointers = sortedtopPointersPlayers.filter(player => player.points >= fifthTopPointers);

  const topPointersResume = ensureMaximumNinePlayers(bestTopPointers.map((topPointer) => {
    return {
      name: topPointer.name,
      count: topPointer.points
    };
  }));

  // LVP
  const filtredLVP = pointStats
    ?.filter(player => {
      const participatedWeeks = player.weeksParticipated;
      const requiredWeeks = Math.ceil(weeks.length / 2);

      console.log(`Jogador: ${player.name}, Semanas Participadas: ${participatedWeeks}, Semanas Necessárias: ${requiredWeeks}`);
      
      return participatedWeeks >= requiredWeeks && player.name !== playerToExclude;
    });

  const sortedLVPPlayers = filtredLVP?.sort((a, b) => a.pointsPercentage - b.pointsPercentage);
  const fifthLVP = sortedLVPPlayers[4]?.pointsPercentage ?? sortedLVPPlayers[sortedLVPPlayers.length - 1]?.pointsPercentage;

  const bestLVP = sortedLVPPlayers.filter(player => player.pointsPercentage <= fifthLVP);

  const LVPResume = ensureMaximumNinePlayers(bestLVP.map((lowerPointer) => {
    return {
      name: lowerPointer.name,
      count: lowerPointer.pointsPercentage
    };
  }));



  // MVP
  const playerChampionCount: { [playerName: string]: { count: number, pointsPercentage: number } } = {};
  weeks?.forEach((week) => {
    week.teams
      .filter(team => team.champion)
      .flatMap(team => team.players)
      .forEach(player => {
        const playerName = player.player.name;
        if (playerName !== playerToExclude) {
          if (playerChampionCount[playerName]) {
            playerChampionCount[playerName].count++;
          } else {
            const playerStats = pointStats.find(stats => stats.name === playerName);
            playerChampionCount[playerName] = {
              count: 1,
              pointsPercentage: playerStats?.pointsPercentage || 0,
            };
          }
        }
      });
  });

  const raceForMVP = Object.entries(playerChampionCount).map(([name, data]) => ({
    name,
    count: data.count,
    pointsPercentage: data.pointsPercentage
  }));
  
  const sortedMVPPlayers = raceForMVP?.sort((a, b) => {
    if (b.count === a.count) {
      return b.pointsPercentage - a.pointsPercentage; // Critério de desempate
    }
    return b.count - a.count;
  });
  
  const bestMVP = ensureMaximumNinePlayers(sortedMVPPlayers.slice(0, 9));

  const MVPResume = bestMVP.map((MVP) => {
    return {
      name: MVP.name,
      count: MVP.count
    };
  });

  return {
    assists: assistsResume,
    scorer: strikersResume,
    mvp: MVPResume,
    lvp: LVPResume,
    bestDefender: defendersResume,
    topPointer: topPointersResume,
  };
};



