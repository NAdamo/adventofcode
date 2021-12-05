import { readInput } from '../readInput';
import { firstAnswer, secondAnswer } from './solve';


const day = 5

describe(`Day ${day}`, () => {
    const testData: Promise<string[] | undefined> = readInput(`${__dirname}/example.txt`);
    it('solve the example for first answer', async () => {
        expect(firstAnswer((await testData) ?? [])).toBe(5)
    })

    it('solve the example for second answer', async () => {
        expect(secondAnswer((await testData) ?? [])).toBe(12)
    })
})
