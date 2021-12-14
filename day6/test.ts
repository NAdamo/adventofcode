import { firstAnswer, secondAnswer } from './solve';

const day = 6

describe(`Day ${day}`, () => {
    const testData: string[] = ['3,4,3,1,2']
    it('lanternfishes count should be 26 after 18 days', () => {
        expect(firstAnswer(testData, 18)).toBe(26)
    })

    it('lanternfishes count should be 5634 after 80 days', () => {
        expect(firstAnswer(testData)).toBe(5934)
    })

    it('solve the example for second answer', () => {
        expect(secondAnswer(testData)).toBe(26984457539)
    })
})
