import { firstAnswer, secondAnswer } from './solve';

const day = 2

describe(`Day ${day}`, () => {
    const testData: string[] = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
    it('solve the example for first answer', () => {
        expect(firstAnswer(testData)).toBe(150);
    })

    it('solve the example for second answer', () => {
        expect(secondAnswer(testData)).toBe(900);
    })
})
