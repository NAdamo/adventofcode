import { readInputAsInteger } from '../readInput';
import { firstAnswer, secondAnswer } from "./solve";


readInputAsInteger(`${__dirname}/input.txt`).then(data => {
    console.log('Day 1')
    console.group();
    console.log('First answer is: ', firstAnswer(data ?? []));
    console.log('Second answer is: ', secondAnswer(data ?? []));
    console.groupEnd()
})

