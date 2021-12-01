import { firstAnswer, secondAnswer } from './solve';

const day = 0

describe(`Day ${day}`, () => {
    const testData: number[] = []
    it('solve the example for first answer', () => {
        expect(firstAnswer(testData)).toBe(0)
    })

    it('solve the example for second answer', () => {
        expect(secondAnswer(testData)).toBe(0)
    })
})
