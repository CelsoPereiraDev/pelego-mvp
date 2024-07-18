import { Player, PlayerGetOverallFormData } from "@/types/player";

export const formToPlayerMapper = (formData: PlayerGetOverallFormData, overallValue:number): Player => {
    const { name, overall, position,country } = formData;

    const player: Player = {
        name,
        overall: {
            pace: overall.pace,
            shooting: overall.shooting,
            passing: overall.passing,
            dribble: overall.dribble,
            defense: overall.defense,
            physics: overall.physics,
            overall: overallValue,
        },
        position,
        country,
    };

    return player;
};