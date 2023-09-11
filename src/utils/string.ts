export const StringFormat = (str: string, ...args: string[]) => {
    return str.replace(/{(\d+)}/g, (match, index) => args[index] || '')
}

export const MoneyFormat = (price: number) => {
    // Format the price above to USD using the locale, style, and currency.
    // Can be changed to use the 
    const Dollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return Dollar.format(price)
}