import { template } from '@babel/core';
type Transformation = {
    pattern: string;
    replace: string;
    insert: string;
}

type TranformationInput = {
    template: string;
    rules: Map<string, Transformation>;
    charCounts: Map<string, number>
}

const parseInput: (rawInput: string[]) => TranformationInput = (rawInput) => {
    const template = rawInput[0];
    const rules = new Map<string, Transformation>();
    rawInput.filter((line) => line.includes('->')).forEach((line) => {
        const [pattern, insert] = line.split(' -> ');
        rules.set(pattern, { pattern, replace: `${pattern.substring(0, 1)}${insert}${pattern.substring(1)}`, insert });
    })
    const charCounts = template.split('').reduce((counts, char) => {
        counts.set(char, (counts.get(char) ?? 0) + 1)
        return counts;
    }, new Map<string, number>())
    return { template, rules, charCounts }
}

const insert: (input: TranformationInput) => TranformationInput = ({ template, rules, charCounts }) => {
    let newTemplate = '';
    let iterator = template;

    while (iterator.length > 1) {
        const rule = rules.get(iterator.slice(0, 2))
        if (rule) {
            newTemplate += rule.replace.slice(0, 2);
            charCounts.set(rule.insert, (charCounts.get(rule.insert) ?? 0) + 1)
        }
        iterator = iterator.slice(1);
    }
    newTemplate += iterator

    return { template: newTemplate, rules, charCounts }
}

const iterateInsert: (rawInput: string[], step: number) => TranformationInput = (rawInput, step) => {
    let iterator = parseInput(rawInput)
    for (let i = 0; i < step; i++) {
        iterator = insert(iterator);
    }

    return iterator
}

export const firstAnswer: (rawInput: string[]) => number = (rawInput) => {
    const { charCounts } = iterateInsert(rawInput, 10);

    return Math.max(...charCounts.values()) - Math.min(...charCounts.values());
}
export const secondAnswer: (rawInput: string[]) => number = (rawInput) => {
    return 0;
};