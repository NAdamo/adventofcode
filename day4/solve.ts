type BingoItem = {
    value: number;
    marked: boolean;
}

type BingoLine = {
    values: BingoItem[];
    markedCount: number;
    isColumn: boolean;
}

type BingoLineArray = BingoLine[];
type BingoBoard = {
    lines: BingoLineArray;
    lastNumber: number | undefined;
    round: number;
    id: number
}

const createBingoItem: (value: string) => BingoItem = (value) => ({ value: parseInt(value), marked: false })
const createBingoLine: (line: BingoItem[], isColumn?: boolean) => BingoLine = (line, isColumn = false) => ({ values: line, markedCount: 0, isColumn })

const createBingoBoard: (input: string[], id: number) => BingoBoard = (input, id) => {
    const rows: BingoLineArray = []
    const columnValues: BingoItem[][] = [[], [], [], [], []];
    input.forEach((value) => {
        const row: BingoItem[] = value.trim().replace(/\s+/g, " ").split(' ').map(it => createBingoItem(it));
        rows.push(createBingoLine(row));
        row.forEach((it, index) => {
            columnValues[index].push(it)
        })
    });
    const columns: BingoLineArray = columnValues.map(column => createBingoLine(column, true));
    return { lines: [...rows, ...columns], lastNumber: undefined, round: 0, id }
}

const findActiveBoards: (bingoBoards: BingoBoard[]) => BingoBoard[] = (bingoBoards) => {
    return bingoBoards.filter(({ lastNumber }) => lastNumber == undefined);
}

const playBoards: (drawnNumbers: number[], bingoBoards: BingoBoard[]) => BingoBoard[] = (drawnNumbers, bingoBoards) => {
    let activeBoards = findActiveBoards(bingoBoards);
    let drawnNumbersCount = 0;
    console.log('activeBoards.length', activeBoards.length);

    while (activeBoards.length > 0 && drawnNumbersCount <= drawnNumbers.length) {
        console.log(drawnNumbersCount, 'activeBoards.length', activeBoards.length);
        const drawnNumber = drawnNumbers[drawnNumbersCount]
        for (let board of activeBoards) {
            for (let line of board.lines) {
                const foundIndex = line.values.findIndex(({ value }) => value == drawnNumber);
                if (foundIndex > -1) {
                    line.values[foundIndex].marked = true;
                    if (++line.markedCount == line.values.length) {
                        const winnerBoard = bingoBoards.find(({ id }) => id == board.id)
                        if (winnerBoard) {
                            winnerBoard.lastNumber = drawnNumber;
                            winnerBoard.round = drawnNumbersCount;
                        }
                    }
                }
            }
        }
        activeBoards = findActiveBoards(activeBoards);
        drawnNumbersCount++;
    }

    return bingoBoards;
}

const calculateWinnerBoardScore: (winnerBoard: BingoBoard) => number = (winnerBoard) => {
    const winnerLine = winnerBoard.lines.find(line => line.markedCount == line.values.length);
    const sumOfUnmarked = winnerBoard.lines
        .filter(({ isColumn }) => isColumn == winnerLine?.isColumn)
        .reduce((sum, { values }) => {
            return sum + values.filter(({ marked }) => marked == false).reduce((sum, { value }) => sum + value, 0);
        }, 0);

    console.log('sumOfUnmarked', sumOfUnmarked);


    return sumOfUnmarked * (winnerBoard.lastNumber || 1);
}

const setupBingoBoards: (originalInput: string[]) => { bingoBoards: BingoBoard[], drawnNumbers: number[] } = (originalInput) => {
    const input = [...originalInput]
    const drawnNumbers = input.splice(0, 1)[0].split(',').map(it => parseInt(it));
    const bingoBoards: BingoBoard[] = []
    let currentId = 1;
    while (input.length) {
        input.shift();
        bingoBoards.push(createBingoBoard(input.splice(0, 5), currentId++));
    }
    return { bingoBoards, drawnNumbers }
}

export const firstAnswer: (input: string[]) => number = (input) => {
    const { bingoBoards, drawnNumbers } = setupBingoBoards(input);
    const winnerBoard = playBoards(drawnNumbers, bingoBoards).sort((a, b) => a.round - b.round).shift() as BingoBoard;
    return calculateWinnerBoardScore(winnerBoard);
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const { bingoBoards, drawnNumbers } = setupBingoBoards(input);
    const winnerBoard = playBoards(drawnNumbers, bingoBoards).sort((a, b) => a.round - b.round).pop() as BingoBoard;
    console.log(winnerBoard)
    return calculateWinnerBoardScore(winnerBoard);
};