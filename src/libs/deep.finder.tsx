export default function deepFinder(haystack: unknown, needle: string): boolean {
    if (haystack !== null && typeof haystack === 'object') {

        for (const e of Object.values(haystack)) {
            if (e === needle) {
                return true
            }

            if (typeof e !== 'string') {
                if (deepFinder(e, needle)) {
                    return true;
                }
            }
        }
    }
    return false
}