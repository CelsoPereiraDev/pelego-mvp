interface CalculateOverallProps {
    position: 'DEF' | 'MEI' | 'ATK';
    overall: {
        pace: number;
        shooting: number;
        passing: number;
        dribble: number;
        defense: number;
        physics: number;
    };
}

export function calculateOverall({ position, overall }: CalculateOverallProps): number {
    const pace = overall?.pace;
    const shooting = overall?.shooting;
    const passing = overall?.passing;
    const dribble = overall?.dribble;
    const defense = overall?.defense;
    const physics = overall?.physics;

    if (position === 'DEF') {
        overall.pace *= 2;
        overall.shooting *= 2;
        overall.passing *= 3;
        overall.dribble *= 1;
        overall.defense *= 6;
        overall.physics *= 3;
    } else if (position === 'MEI') {
        overall.pace *= 3;
        overall.shooting *= 3;
        overall.passing *= 3;
        overall.dribble *= 3;
        overall.defense *= 3;
        overall.physics *= 3;
    } else if (position === 'ATK') {
        overall.pace *= 3;
        overall.shooting *= 5;
        overall.passing *= 2;
        overall.dribble *= 4;
        overall.defense *= 1;
        overall.physics *= 3;
    }

    const total = (pace + shooting + passing + dribble + defense + physics) / 18;

    return Math.round(total);
}
