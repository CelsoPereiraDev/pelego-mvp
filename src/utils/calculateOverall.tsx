interface CalculateOverallProps {
    position: 'DEF' | 'MEI' | 'ATK';
    overall: {
        pace: string;
        shooting: string;
        passing: string;
        dribble: string;
        defense: string;
        physics: string;
    };
}

export function calculateOverall({ position, overall }: CalculateOverallProps): number {
    let pace = parseInt(overall?.pace);
    let shooting = parseInt(overall?.shooting);
    let passing = parseInt(overall?.passing);
    let dribble = parseInt(overall?.dribble);
    let defense = parseInt(overall?.defense);
    let physics = parseInt(overall?.physics);

    if (position === 'DEF') {
        pace *= 2;
        shooting *= 2;
        passing *= 3;
        dribble *= 1;
        defense *= 6;
        physics *= 3;
    } else if (position === 'MEI') {
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
        defense *= 1;
        physics *= 3;
    }

    const total = (pace + shooting + passing + dribble + defense + physics) / 18;

    return Math.round(total);
}
