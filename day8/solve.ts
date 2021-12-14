const parseInput: (input: string[]) => { input: string[], output: string[] }[] = (input) => {
    return input.map(line => {
        const [input, output] = line.split('|').map(it => it.trim().split(' '));
        return { input, output }
    })
}

const analyzeInput: (input: string[]) => Map<string, number> = (input) => {
    const inputDigits = new Map<string, number>();
    const digitsInput = new Map<number, { original: string, sorted: string, array: string[] }>();
    const display: string[] = new Array(7).fill('_')

    input.filter(it => [2, 3, 4, 7].find(i => i == it.length)).forEach(original => {
        const sorted = original.split('').sort().join('')
        switch (original.length) {
            case 2:
                digitsInput.set(1, { original, sorted, array: sorted.split('') });
                inputDigits.set(sorted, 1)
                break;

            case 3:
                digitsInput.set(7, { original, sorted, array: sorted.split('') });
                inputDigits.set(sorted, 7)
                break;

            case 4:
                digitsInput.set(4, { original, sorted, array: sorted.split('') });
                inputDigits.set(sorted, 4)
                break;

            default:
                digitsInput.set(8, { original, sorted, array: sorted.split('') });
                inputDigits.set(sorted, 8)
        }
    });

    display[0] = digitsInput.get(7)?.array.filter(it => !digitsInput.get(1)?.array.includes(it))[0] ?? '_';


    const remain = input.filter(it => it.length == 5).map(original => {
        const array = original.split('').sort();
        const sorted = array.join('');
        if (digitsInput.get(1)?.array.every((char) => array.includes(char))) {
            digitsInput.set(3, { original, sorted, array });
            inputDigits.set(sorted, 3);
            return '_'
        }
        return original
    }).filter(it => it != '_')

    input.filter(it => it.length == 6).forEach(original => {
        const array = original.split('').sort();
        const sorted = array.join('');
        if (digitsInput.get(3)?.array.every((char) => array.includes(char))) {
            digitsInput.set(9, { original, sorted, array });
            inputDigits.set(sorted, 9);
            return;
        }
        if (digitsInput.get(1)?.array.every((char) => array.includes(char))) {
            digitsInput.set(0, { original, sorted, array });
            inputDigits.set(sorted, 0);
            return;
        }
        digitsInput.set(6, { original, sorted, array });
        inputDigits.set(sorted, 6);

    })
    display[2] = digitsInput.get(1)?.array.filter(it => !digitsInput.get(6)?.array.includes(it))[0] ?? '_';

    remain.forEach(original => {
        const array = original.split('').sort();
        const sorted = array.join('');
        if (sorted.includes(display[2])) {
            digitsInput.set(2, { original, sorted, array });
            inputDigits.set(sorted, 2);
            return;
        }
        digitsInput.set(5, { original, sorted, array });
        inputDigits.set(sorted, 5);

    })

    return inputDigits;
}

export const firstAnswer: (input: string[]) => number = (input) => {
    return parseInput(input).reduce((sum, { output }) => {
        return sum + output.reduce((count, it) => {
            if ([2, 3, 4, 7].find(i => i == it.length)) {
                return count + 1;
            }
            return count
        }, 0);
    }, 0);
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const parsedInput = parseInput(input);
    parsedInput.map(({ input, output }) => { digits: analyzeInput(input), analyzeInput });

    return parsedInput.map(({ input, output }) => ({ digits: analyzeInput(input), output })).reduce((sum, { digits, output }) => {
        const outputDigits = sum + output.reduce((num, it, index) => {
            const sortedIt = it.split('').sort().join('');
            const digit = digits.get(sortedIt) ?? -1

            if (digit > -1) {
                return num + digit * Math.pow(10, 3 - index);
            }
            return num
        }, 0);
        return outputDigits;
    }, 0);
};