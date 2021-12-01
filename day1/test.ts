import { checkDepth, checkDepthByThreeMeasurements } from './solve';

describe('Day 1', () => {
    const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    it('count increasing depth', () => {
        expect(checkDepth(testData)).toBe(7)
    })

    it('count increasing depth by 3 measurements', () => {
        expect(checkDepthByThreeMeasurements(testData)).toBe(5)
    })
})
