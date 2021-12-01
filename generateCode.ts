import { template } from '@babel/core';
import { opendir, mkdir, readFile, writeFile, readdir, open } from 'fs/promises';

function instanceOfNodeError<T extends new (...args: any) => Error>(
    value: Error | unknown,
    errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
    return value instanceof errorType;
}


export const generateCode: (day: number) => Promise<void> = async (day) => {
    if (day > 25) {
        throw new Error('The day value should be less than or equal 25');
    }
    const folderName = `day${day}`;
    try {
        await opendir(folderName);
        throw new Error(`Directory '${folderName}' already exists`);
    } catch (error) {
        if (instanceOfNodeError(error, Error)) {
            const { errno, code, syscall, path = '' } = error;
            if (errno == -2 && code == 'ENOENT' && syscall == 'opendir') {
                await mkdir(path);
                console.log(`Directory created: ${path}`);
                for (let fileName of await readdir('template')) {
                    const filePath = `${__dirname}/template/${fileName}`;
                    console.log(filePath);
                    const fileContent = (await readFile(filePath))
                        .toString()
                        .replace('const day = 0', `const day = ${day}`);
                    console.log(fileContent);
                    await writeFile(`${__dirname}/${path}/${fileName}`, fileContent);
                }
            }
            else {
                throw error;
            }
        }
    }
}
