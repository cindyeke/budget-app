import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BudgetItemDetails } from '@/types/BudgetTypes'
import { formatAmountWithCurrency } from '@/utils/format'

interface EquationProps {
    income: number
    equationList: BudgetItemDetails[]
    isAmountFieldUpdated: boolean
    setIsAmountFieldUpdated: Dispatch<SetStateAction<boolean>>
}

const Equations = ({
    income,
    equationList,
    isAmountFieldUpdated,
    setIsAmountFieldUpdated,
}: EquationProps) => {
    const [amountLeft, setAmountLeft] = useState(income)

    const calculateRemainingAmount = () => {
        let calculatedIncome = income

        equationList.forEach((item) => {
            const amount = parseInt(item.amount)

            if (item.operation === 'deduct') {
                calculatedIncome -= amount // Deduct the amount from income
            } else if (item.operation === 'add') {
                calculatedIncome += amount // Add the amount to income
            }
        })

        setAmountLeft(calculatedIncome)

        setIsAmountFieldUpdated(false)
    }

    useEffect(() => {
        if (isAmountFieldUpdated) {
            calculateRemainingAmount()
        }
    }, [isAmountFieldUpdated])

    return (
        <div className="mt-5 ml-8 mr-5 grid grid-cols-2 text-sm xs:text-base bg-off-white rounded-lg p-5">
            <span>Balance</span>
            <span className="justify-self-end tracking-[2px]">
                {formatAmountWithCurrency(amountLeft.toString())}
            </span>
        </div>
    )
}

export default Equations
