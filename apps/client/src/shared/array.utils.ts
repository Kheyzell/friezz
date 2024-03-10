export function getElementsAtRandomFromArray<T>(array: T[], n: number): T[] {
    if (n >= array.length) {
        return array;
    }

    const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n);
}