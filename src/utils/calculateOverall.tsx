interface CalculateOverallProps {
    position: 'DEF' | 'MEI' | 'ATK'| 'GOL';
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
    if (!overall) {
        return 0;
    }

    let { pace = 0, shooting = 0, passing = 0, dribble = 0, defense = 0, physics = 0 } = overall;

    if (position === 'DEF') {
        pace *= 2;
        shooting *= 2;
        passing *= 3;
        defense *= 6;
        physics *= 3;
    } else if (position === 'MEI' || position === 'GOL') {
        pace *= 3;
        shooting *= 3;
        passing *= 3;
        dribble *= 3;
        defense *= 3;
        physics *= 3;
    } else if (position === 'ATK') {
        pace *= 3;
        shooting *= 5;
        passing *= 2;
        dribble *= 4;
        physics *= 3;
    }

    const total = (pace + shooting + passing + dribble + defense + physics) / 18;

    return Math.round(total);
}
