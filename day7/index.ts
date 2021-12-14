import { readInput } from '../readInput';
import { firstAnswer, secondAnswer } from "./solve";

const day = 7

readInput(`${__dirname}/input.txt`).then(data => {
    if (data) {
        const numberData = data[0].split(',').map(it => parseInt(it))
        console.log(`Day ${day}`)
        console.group();
        console.log('First answer is: ', firstAnswer(numberData));
        console.log('Second answer is: ', secondAnswer(numberData ?? []));
        console.groupEnd()
    }
})

