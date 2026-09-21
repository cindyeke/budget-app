export const NGN_LOCALES = 'en-NG'

export const formatAmountWithCurrency = (amount: string, currency: string) =>
    new Intl.NumberFormat(NGN_LOCALES, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(parseInt(amount))
