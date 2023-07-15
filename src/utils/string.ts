export const StringFormat = (str: string, ...args: string[]) => {
    return str.replace(/{(\d+)}/g, (match, index) => args[index] || '')
}