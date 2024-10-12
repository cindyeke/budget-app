export const ADD = 'add'
export const DEDUCT = 'deduct'
export const SUBMIT = 'submit'
export const RESET = 'reset'
export const BUTTON = 'button'

export type ButtonType = typeof SUBMIT | typeof RESET | typeof BUTTON
export type BudgetItemOperation = typeof ADD | typeof DEDUCT
export type NewBudgetInputs = {
    income: string
    title: string
}
export type NewBudgetDetails = {
    id: string
    income: string
    title: string
}
export type BudgetItemDetails = {
    id: string
    amount: string
    description: string
    operation: string
}
