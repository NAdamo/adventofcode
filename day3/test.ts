import { firstAnswer, secondAnswer } from './solve';

const day = 3

describe(`Day ${day}`, () => {
    const testData: string[] = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];
    it('solve the example for first answer', () => {
        expect(firstAnswer(testData)).toBe(198)
    })

    it('solve the example for second answer', () => {
        expect(secondAnswer(testData)).toBe(230)
    })
})
