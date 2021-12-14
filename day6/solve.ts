export const firstAnswer: (input: string[], days?: number) => number = (input, days = 80) => {
    const initialState = input[0].split(',').map(it => parseInt(it));
    let dailyStateStart = [...initialState];
    for (let day = 0; day < days; day++) {
        let newbornFishCount = 0
        const dailyStateEnd: number[] = []
        for (let fish of dailyStateStart) {
            if (fish == 0) {
                dailyStateEnd.push(6);
                newbornFishCount++;
            }
            else {
                dailyStateEnd.push(fish - 1);
            }
        }
        for (let i = 0; i < newbornFishCount; i++) {
            dailyStateEnd.push(8);
        }
        dailyStateStart = [...dailyStateEnd]
    }
    return dailyStateStart.length;
}
export const secondAnswer: (input: string[]) => number = (input) => {
    const lanternfishes = new Array(9).fill(0);
    input[0].split(',').map(it => parseInt(it)).forEach((lanternfish) => {
        lanternfishes[lanternfish] += 1;
    })
    for (let timer = 0; timer < 256; timer++) {
        const newbornFishCount = lanternfishes[0];
        lanternfishes.shift();
        lanternfishes.push(newbornFishCount);
        lanternfishes[6] += newbornFishCount;
    }
    return lanternfishes.reduce((sum, val) => sum + val, 0);
};