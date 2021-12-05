import { readInput } from '../readInput';
import { firstAnswer, secondAnswer } from "./solve";

const day = 4

readInput(`${__dirname}/input.txt`).then(data => {
    console.log(`Day ${day}`)
    console.group();
    console.log('First answer is: ', firstAnswer([...(data as string[])] ?? []));
    console.log('Second answer is: ', secondAnswer([...(data as string[])] ?? []));
    console.groupEnd()
})

