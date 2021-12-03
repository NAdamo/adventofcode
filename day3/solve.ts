export const firstAnswer: (input: string[]) => number = (input) => {
    const ones = input.map(line => line.split('')).reduce<number[]>((countOnes, value) => {
        value.forEach((it, index) => {
            countOnes[index] = countOnes[index] ? countOnes[index] + parseInt(it) : parseInt(it);
        })
        return countOnes
    }, [])
    console.log(ones);
    const recordsCount = input.length
    const rates = ones.reduce((prev, current, index, array) => {
        let { gamma, epsilon } = prev
        if (current > recordsCount / 2) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
        return { gamma, epsilon };
    }, {
        gamma: '',
        epsilon: ''
    })

    return parseInt(rates.gamma, 2) * parseInt(rates.epsilon, 2);
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const filterInput: (values: string[][], index: number, common?: boolean) => string[][] = (values, index, common = true) => {
        const ones = values.reduce((countOnes, value) => {
            return countOnes + parseInt(value[index]);
        }, 0)
        return values.filter((it) => {
            if (common) {
                if (ones >= values.length / 2) {
                    return it[index] == '1';
                }
                return it[index] == '0';
            }
            if (ones < values.length / 2) {
                return it[index] == '1';
            }
            return it[index] == '0';
        });
    }
    const calculateRate: (values: string[][], common?: boolean) => number = (values, common = true) => {
        let i = 0;
        while (values.length > 1) {
            values = filterInput(values, i++, common);
        }
        console.log(values[0].join(''));
        return parseInt(values[0].join(''), 2);
    }

    const lines = input.map(line => line.split(''));
    const oxigenRate = calculateRate(lines);
    const co2Rate = calculateRate(lines, false);

    return oxigenRate * co2Rate;
};