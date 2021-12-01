import { readFile } from 'fs/promises'

export const readInput: (filePath: string) => Promise<string[] | undefined> = async (filePath) => {
    try {
        return (await readFile(filePath)).toString().split('\n');
    }
    catch (error) {
        console.error(error)
    }
}

export const readInputAsInteger: (filePath: string) => Promise<number[] | undefined> = async (filePath) => {
    return (await readInput(filePath))?.map((line) => parseInt(line))
}

export const readInputAsFloat: (filePath: string) => Promise<number[] | undefined> = async (filePath) => {
    return (await readInput(filePath))?.map((line) => parseFloat(line))
}