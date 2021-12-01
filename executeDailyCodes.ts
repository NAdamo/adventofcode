import { readdir } from 'fs/promises';

export const executeDailyCodes: (day?: number) => Promise<void> = async (day) => {
    try {
        const dirEntities = (await readdir(__dirname, { withFileTypes: true }))
            .filter(value => value.isDirectory() && day ? value.name == `day${day}` : value.name.startsWith(`day`))

        for (let dirEntity of dirEntities) {
            await import(`${__dirname}/${dirEntity.name}/index.ts`);
        }
    } catch (e) {
        throw e;
    }
}