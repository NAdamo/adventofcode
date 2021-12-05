import { firstAnswer, secondAnswer } from './solve';
import { readInput } from '../readInput'
const day = 4

describe(`Day ${day}`, () => {
    const testData: Promise<string[] | undefined> = readInput(`${__dirname}/example.txt`);
    it('solve the example for first answer', async () => {
        console.log(await testData);
        expect(firstAnswer((await testData) ?? [])).toBe(4512)
    })

    it('solve the example for second answer', async () => {
        expect(secondAnswer((await testData) ?? [])).toBe(1924)
    })
})
