import { firstAnswer, secondAnswer } from './solve';

const day = 7

describe(`Day ${day}`, () => {
    const testData: number[] = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
    it('solve the example for first answer', () => {
        expect(firstAnswer(testData)).toBe(37)
    })

    it('solve the example for second answer', () => {
        expect(secondAnswer(testData)).toBe(168)
    })
})
