export const checkDepth: (input: number[]) => number = (input) => {
    return input.reduce((sum, value, index, data) => {
        if (index > 0 && value > data[index - 1]) {
            sum++;
        }
        return sum;
    }, 0);
}

export const checkDepthByThreeMeasurements: (input: number[]) => number = (input) => {
    return checkDepth(input.map((value, index, data) => {
        return data.slice(index, index + 3).reduce((sum, value) => sum + value, 0)
    }).slice(0, -2));
}

export const firstAnswer = checkDepth;
export const secondAnswer = checkDepthByThreeMeasurements;