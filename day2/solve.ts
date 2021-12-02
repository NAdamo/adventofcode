export const firstAnswer: (input: string[]) => number = (input) => {
    const finalPosition = input.map(line => line.split(' ')).reduce((movement, currentMove) => {
        let { horizontal, depth } = movement;
        const [direction, value] = currentMove;
        switch (direction) {
            case 'forward':
                horizontal += parseInt(value);
                break;
            case 'up':
                depth -= parseInt(value);
                break;
            case 'down':
                depth += parseInt(value);
                break;
        }
        return { horizontal, depth };
    }, { horizontal: 0, depth: 0 })
    return finalPosition.horizontal * finalPosition.depth;
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const finalPosition = input.map(line => line.split(' ')).reduce((movement, currentMove) => {
        let { horizontal, depth, aim } = movement;
        const [direction, value] = currentMove;
        const intValue = parseInt(value);
        switch (direction) {
            case 'forward':
                horizontal += intValue;
                depth += aim * intValue
                break;
            case 'up':
                aim -= intValue;
                break;
            case 'down':
                aim += intValue;
                break;
        }
        return { horizontal, depth, aim };
    }, { horizontal: 0, depth: 0, aim: 0 })
    return finalPosition.horizontal * finalPosition.depth;
};