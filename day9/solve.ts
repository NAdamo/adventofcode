const checkAdjacent: (array: number[][], row: number, column: number) => boolean = (array, row, column) => {
    const up = row > 0 ? array[row - 1][column] : null;
    const down = row < array.length - 1 ? array[row + 1][column] : null;
    const left = column > 0 ? array[row][column - 1] : null;
    const right = column < array[row].length - 1 ? array[row][column + 1] : null;
    const current = array[row][column]

    return (up != null ? current < up : true) && (down != null ? current < down : true) && (left != null ? current < left : true) && (right != null ? current < right : true);
}

export const firstAnswer: (input: string[]) => number = (input) => {
    return input.map(line => line.split('').map(it => parseInt(it))).map((line, row, array) => {
        return line.map((it, column) => {
            return checkAdjacent(array, row, column) ? it + 1 : 0
        })
    }).reduce((sum, line) => {
        return sum + line.reduce((lineSum, it) => lineSum + it, 0)
    }, 0)
}
export const secondAnswer: (input: string[]) => number = (input) => {
    return 0;
};