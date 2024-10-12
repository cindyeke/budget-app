export const NGN_LOCALES = 'en-NG'

export const formatAmountWithCurrency = (amount: string) =>
    new Intl.NumberFormat(NGN_LOCALES, {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(parseInt(amount))
