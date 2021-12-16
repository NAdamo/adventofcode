import { getOuterBindingIdentifiers } from "@babel/types";
import { parse } from "yargs";
type Packet = { version: number, type: number, isLiteral: boolean, packet: string, subPackets?: Packet[], value?: string, parsedValue?: number }

export const hexToDecimal: (hex: string) => string = (hex) => hex.split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('');

export const parsePacket: (packet: string) => Packet = (packet) => {
    const version = parseInt(packet.slice(0, 3), 2);
    const type = parseInt(packet.slice(3, 6), 2);
    const isLiteral = type === 4;
    if (isLiteral) {
        let iterator = packet.slice(6);
        let isLast = false
        let value = ''
        while (!isLast) {
            isLast = !parseInt(iterator.slice(0, 1));
            value += iterator.slice(1, 5)
            iterator = iterator.slice(5);
        }
        return {
            version, type, isLiteral, value, parsedValue: parseInt(value, 2), packet: packet.slice(0, 6 + ((value.length / 4) * 5))
        }

    }
    const operatorTypeId = packet.slice(6, 7);
    if (operatorTypeId === '0') {
        const length = parseInt(packet.slice(7, 22), 2)
        let subPacketString = packet.slice(22, 22 + length);
        const subPackets: Packet[] = [];
        while (subPacketString.length > 1) {
            const subPacket = parsePacket(subPacketString);
            subPackets.push(subPacket);
            subPacketString = subPacketString.slice(subPacket.packet.length);
        }
        return calculateValue({
            version, type, isLiteral, subPackets, packet: packet.slice(0, 22 + length)
        })

    }
    const numberOfSubPackets = parseInt(packet.slice(7, 18), 2);
    let subPacketString = packet.slice(18);
    const subPackets: Packet[] = []
    while (subPackets.length !== numberOfSubPackets) {
        const subPacket = parsePacket(subPacketString);
        subPackets.push(subPacket);
        subPacketString = subPacketString.slice(subPacket.packet.length);
    }
    return calculateValue({
        version, type, isLiteral, packet: packet.slice(0, 18) + subPackets.reduce((accumulator, it) => accumulator + it.packet, ''), subPackets
    });
}

const sumVersion: (packet: Packet) => number = (packet) => {
    let sum = packet.version
    if (packet.subPackets) {
        return sum + packet.subPackets.reduce((subSum, subPacket) => subSum + sumVersion(subPacket), 0)
    }
    return sum;
}

const calculateValue: (packet: Packet) => Packet = (packet) => {
    const { type, subPackets, parsedValue, isLiteral, ...rest } = packet
    if (isLiteral) {
        return packet;
    }
    if (!(subPackets?.every(it => it.isLiteral))) {
        subPackets?.map(it => calculateValue(it))
    }
    if (subPackets) {
        switch (type) {
            case 0:
                return { type, subPackets, parsedValue: subPackets.reduce((sum, { parsedValue }) => sum + parsedValue!, 0), isLiteral, ...rest }
            case 1:
                return { type, subPackets, parsedValue: subPackets.reduce((sum, { parsedValue }) => sum * parsedValue!, 1), isLiteral, ...rest }
            case 2:
                return { type, subPackets, parsedValue: Math.min(...subPackets.map(({ parsedValue }) => parsedValue!) ?? []), isLiteral, ...rest }
            case 3:
                return { type, subPackets, parsedValue: Math.max(...subPackets.map(({ parsedValue }) => parsedValue!) ?? []), isLiteral, ...rest }
            case 5:
                return { type, subPackets, parsedValue: subPackets[0].parsedValue! > subPackets[1].parsedValue! ? 1 : 0, isLiteral, ...rest }
            case 6:
                return { type, subPackets, parsedValue: subPackets[0].parsedValue! < subPackets[1].parsedValue! ? 1 : 0, isLiteral, ...rest }
            case 7:
                return { type, subPackets, parsedValue: subPackets[0].parsedValue! === subPackets[1].parsedValue! ? 1 : 0, isLiteral, ...rest }
            default:
                return packet
        }
    }
    return packet;
}

export const firstAnswer: (input: string[]) => number = (rawInput) => {
    return sumVersion(parsePacket(rawInput[0].split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('')));
}
export const secondAnswer: (input: string[]) => number = (rawInput) => {
    return parsePacket(rawInput[0].split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('')).parsedValue ?? -1;
};