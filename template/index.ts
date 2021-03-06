import { readInputAsInteger } from '../readInput';
import { firstAnswer, secondAnswer } from "./solve";

const day = 0

readInputAsInteger(`${__dirname}/input.txt`).then(data => {
    console.log(`Day ${day}`)
    console.group();
    console.log('First answer is: ', firstAnswer(data ?? []));
    console.log('Second answer is: ', secondAnswer(data ?? []));
    console.groupEnd()
})

