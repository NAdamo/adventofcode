import { readdir } from 'fs/promises'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
const todayDate = new Date().getDate();
const argv = yargs(hideBin(process.argv))
    .options({
        'a': {
            alias: 'all',
            boolean: true,
        },
        'd': {
            alias: 'day',
            number: true,
            default: todayDate <= 25 ? todayDate : 25
        }
    })
    .help()
    .argv
const day = argv.day;
const useDay = !argv.all;

readdir(__dirname, { withFileTypes: true }).then(data => {
    data.filter(value => value.isDirectory() && useDay ? value.name == `day${day}` : value.name.startsWith(`day`))
        .forEach((dir) => {
            import(`${__dirname}/${dir.name}/index.ts`);
        });
})
