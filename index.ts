import { executeDailyCodes } from './executeDailyCodes';
import { generateCode } from './generateCode';
import { readdir, mkdir, opendir } from 'fs/promises'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
const todayDate = new Date().getDate();
const argv = yargs(hideBin(process.argv))
    .options({
        'all': {
            alias: 'a',
            boolean: true,
        },
        'day': {
            alias: 'd',
            number: true,
            default: todayDate <= 25 ? todayDate : 25
        },
        'generate': {
            alias: 'g',
            boolean: true
        }
    })
    .help()
    .argv

if (argv.generate) {
    generateCode(argv.day)
        .catch(reason => {
            console.error(reason);
            process.exit(-1);
        })
        .finally(() => process.exit())

}
const day = argv.day;
const useDay = !argv.all;

executeDailyCodes(useDay ? day : undefined)
    .catch(reason => {
        console.error(reason);
        process.exit(-1);
    })
