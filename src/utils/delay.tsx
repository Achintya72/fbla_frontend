/**
 * Promise that resolves after a specified delay
 * @param ms - milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export default function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}