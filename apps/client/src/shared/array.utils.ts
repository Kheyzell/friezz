/**
 * Gets n elements at random from an array.
 *
 * @template T The type of elements in the array
 * @param {T[]} array The array to get elements from
 * @param {number} n The number of elements to get
 * @returns {T[]} The elements at random
 */
export function getElementsAtRandomFromArray<T>(array: T[], n: number): T[] {
    if (n >= array.length) {
        return array;
    }

    const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n);
}
