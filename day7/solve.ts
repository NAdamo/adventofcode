export const firstAnswer: (input: number[]) => number = (input) => {
    const fuels = new Map<number, number>();
    const min = Math.min(...input), max = Math.max(...input);
    for (let position = min; position < max; position++) {
        fuels.set(position, input.reduce((fuel, value) => fuel + Math.abs(position - value), 0));
    }
    return Math.min(...fuels.values());
}
export const secondAnswer: (input: number[]) => number = (input) => {
    const fuels = new Map<number, number>();
    const min = Math.min(...input), max = Math.max(...input);
    for (let position = min; position < max; position++) {

        fuels.set(position, input.reduce((fuel, value) => {
            const steps = Math.abs(position - value)
            const f = (steps * (steps + 1)) / 2
            return fuel + f
        }, 0));
    }
    return Math.min(...fuels.values());
};