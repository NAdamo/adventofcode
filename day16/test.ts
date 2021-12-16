import { firstAnswer, secondAnswer, parsePacket, hexToDecimal } from './solve';

const day = 16

describe(`Day ${day}`, () => {
    const testData: string[] = []
    describe('parseInput', () => {
        it('with example D2FE28', () => {
            expect(parsePacket(hexToDecimal('D2FE28'))).toStrictEqual({
                packet: '110100101111111000101',
                type: 4,
                version: 6,
                isLiteral: true,
                value: '011111100101',
                parsedValue: 2021
            })
        }),
            it('with example 38006F45291200', () => {
                expect(parsePacket(hexToDecimal('38006F45291200'))).toStrictEqual({
                    packet: '0011100000000000011011110100010100101001000100100',
                    type: 6,
                    version: 1,
                    isLiteral: false,
                    subPackets: [{
                        packet: '11010001010',
                        version: 6,
                        type: 4,
                        isLiteral: true,
                        value: '1010',
                        parsedValue: 10
                    },
                    {
                        packet: '0101001000100100',
                        version: 2,
                        type: 4,
                        isLiteral: true,
                        value: '00010100',
                        parsedValue: 20
                    }
                    ],
                    parsedValue: 1
                })
            })
        it('with example EE00D40C823060', () => {
            expect(parsePacket(hexToDecimal('EE00D40C823060'))).toStrictEqual({
                packet: '111011100000000011010100000011001000001000110000011',
                version: 7,
                type: 3,
                isLiteral: false,
                subPackets: [{
                    packet: '01010000001',
                    version: 2,
                    type: 4,
                    isLiteral: true,
                    value: '0001',
                    parsedValue: 1
                },
                {
                    packet: '10010000010',
                    version: 4,
                    type: 4,
                    isLiteral: true,
                    value: '0010',
                    parsedValue: 2
                },
                {
                    packet: '00110000011',
                    version: 1,
                    type: 4,
                    isLiteral: true,
                    value: '0011',
                    parsedValue: 3
                }
                ],
                parsedValue: 3
            })
        })
    })
    describe('solve the example for first answer', () => {
        it('with example 8A004A801A8002F478', () => {
            const testData = ['8A004A801A8002F478']
            expect(firstAnswer(testData)).toBe(16)
        })
        it('with example 620080001611562C8802118E34', () => {
            const testData = ['620080001611562C8802118E34']
            expect(firstAnswer(testData)).toBe(12)
        })
        it('with example C0015000016115A2E0802F182340', () => {
            const testData = ['C0015000016115A2E0802F182340']
            expect(firstAnswer(testData)).toBe(23)
        })
        it('with example A0016C880162017C3686B18A3D4780', () => {
            const testData = ['A0016C880162017C3686B18A3D4780']
            expect(firstAnswer(testData)).toBe(31)
        })
    })

    describe('solve the example for second answer', () => {
        it('with example C200B40A82', () => {
            const testData = ['C200B40A82']
            expect(secondAnswer(testData)).toBe(3)
        })
        it('with example 04005AC33890', () => {
            const testData = ['04005AC33890']
            expect(secondAnswer(testData)).toBe(54)
        })
        it('with example 880086C3E88112', () => {
            const testData = ['880086C3E88112']
            expect(secondAnswer(testData)).toBe(7)
        })
        it('with example CE00C43D881120', () => {
            const testData = ['CE00C43D881120']
            expect(secondAnswer(testData)).toBe(9)
        })
        it('with example D8005AC2A8F0', () => {
            const testData = ['D8005AC2A8F0']
            expect(secondAnswer(testData)).toBe(1)
        })
        it('with example F600BC2D8F', () => {
            const testData = ['F600BC2D8F']
            expect(secondAnswer(testData)).toBe(0)
        })
        it('with example 9C005AC2F8F0', () => {
            const testData = ['9C005AC2F8F0']
            expect(secondAnswer(testData)).toBe(0)
        })
        it('with example 9C0141080250320F1802104A08', () => {
            const testData = ['9C0141080250320F1802104A08']
            expect(secondAnswer(testData)).toBe(1)
        })
    })
})
