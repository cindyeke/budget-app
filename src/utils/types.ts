export const ADD = 'add'
export const DEDUCT = 'deduct'
export const SUBMIT = 'submit'
export const RESET = 'reset'
export const BUTTON = 'button'

export enum CURRENCY {
    NGN = 'NGN',
    XOF = 'XOF',
    EUR = 'EUR',
}

export type ButtonType = typeof SUBMIT | typeof RESET | typeof BUTTON
export type BudgetItemOperation = typeof ADD | typeof DEDUCT

export type BudgetItemDetails = {
    id: string
    amount: string
    description: string
    operation: string
}
export type Budget = {
    id?: string
    income: string
    currency: string
    title: string
    list?: BudgetItemDetails[]
    createdAt?: string
    updatedAt?: string
}
