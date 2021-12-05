type Coordinate = {
    x: number;
    y: number;
}

type Line = {
    from: Coordinate,
    to: Coordinate
}

const createCoordinate: (input: string) => Coordinate = (input) => {
    const [x, y] = input.split(',');
    return { x: parseInt(x), y: parseInt(y) }
}

const createLine: (input: string) => Line = (input) => {
    const [from, to] = input.split('->');
    return { from: createCoordinate(from), to: createCoordinate(to) }
}

const placeLines: (lines: Line[]) => number[][] = (lines) => {
    const coordinateSystem: number[][] = [];
    const enum Direction {
        right,
        left,
        down,
        up,
        diagonalRightDown,
        diagonalLeftDown,
        diagonalRightUp,
        diagonalLeftUp,
    }

    const setDirection: (line: Line) => Direction = ({ from, to }) => {
        if (from.y == to.y) {
            return from.x < to.x ? Direction.right : Direction.left;
        }
        if (from.x == to.x) {
            return from.y < to.y ? Direction.down : Direction.up;
        }
        if (from.x < to.x) {
            if (from.y < to.y) { return Direction.diagonalRightDown; }
            return Direction.diagonalRightUp;
        }
        if (from.y < to.y) { return Direction.diagonalLeftDown; }
        return Direction.diagonalLeftUp;
    }

    for (let line of lines) {
        const { from, to } = line;
        const lineDirection = setDirection(line);

        switch (lineDirection) {
            case Direction.right:
            case Direction.left:
                {
                    const isIncreasing = lineDirection == Direction.right
                    for (let i = from.x; (isIncreasing ? i <= to.x : i >= to.x); (isIncreasing ? i++ : i--)) {
                        if (!Array.isArray(coordinateSystem[from.y])) {
                            coordinateSystem[from.y] = [];
                        }
                        coordinateSystem[from.y][i] = coordinateSystem[from.y][i] ? coordinateSystem[from.y][i] + 1 : 1
                    }
                    break;
                }
            case Direction.down:
            case Direction.up:
                {
                    const isIncreasing = lineDirection == Direction.down
                    for (let i = from.y; (isIncreasing ? i <= to.y : i >= to.y); (isIncreasing ? i++ : i--)) {
                        if (!Array.isArray(coordinateSystem[i])) {
                            coordinateSystem[i] = [];
                        }
                        coordinateSystem[i][from.x] = coordinateSystem[i][from.x] ? coordinateSystem[i][from.x] + 1 : 1
                    }
                    break;
                }
            case Direction.diagonalLeftDown:
            case Direction.diagonalRightDown:
                {
                    for (let y = from.y, x = from.x; y <= to.y; y++) {
                        if (!Array.isArray(coordinateSystem[y])) {
                            coordinateSystem[y] = [];
                        }
                        coordinateSystem[y][x] = coordinateSystem[y][x] ? coordinateSystem[y][x] + 1 : 1;
                        if (lineDirection == Direction.diagonalRightDown) {
                            x++
                        }
                        else {
                            x--
                        }
                    }
                    break;
                }
            case Direction.diagonalLeftUp:
            case Direction.diagonalRightUp:
                {
                    for (let y = from.y, x = from.x; y >= to.y; y--) {
                        if (!Array.isArray(coordinateSystem[y])) {
                            coordinateSystem[y] = [];
                        }
                        coordinateSystem[y][x] = coordinateSystem[y][x] ? coordinateSystem[y][x] + 1 : 1;
                        if (lineDirection == Direction.diagonalRightUp) {
                            x++
                        }
                        else {
                            x--
                        }

                    }
                    break;
                }
        }
    }
    return coordinateSystem;
}

const calculateOverlapingLines: (coordinateSystem: number[][]) => number = (coordinateSystem) => coordinateSystem.map(line => line.reduce((count, it) => (it > 1 ? ++count : count), 0)).reduce((sum, it) => sum + it, 0)

export const firstAnswer: (input: string[]) => number = (input) => {
    const lines = input.map(row => createLine(row)).filter(({ from, to }) => from.x == to.x || from.y == to.y);
    const coordinateSystem = placeLines(lines);
    return calculateOverlapingLines(coordinateSystem);
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const lines = input.map(row => createLine(row));
    const coordinateSystem = placeLines(lines);
    return calculateOverlapingLines(coordinateSystem);
};