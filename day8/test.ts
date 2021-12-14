import { readInput } from '../readInput';
import { firstAnswer, secondAnswer } from './solve';

const day = 8

describe(`Day ${day}`, () => {
    const testData: Promise<string[] | undefined> = readInput(`${__dirname}/example.txt`);
    it('solve the example for first answer', async () => {
        expect(firstAnswer((await testData) ?? [])).toBe(26)
    })

    it('solve the example for second answer', async () => {
        expect(secondAnswer((await testData) ?? [])).toBe(61229)
    })
})
