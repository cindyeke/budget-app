import { useEffect } from 'react'
import BudgetItem from '@/components/molecules/BudgetItem/BudgetItem'
import { BudgetItemOperation } from '@/types/BudgetTypes'

interface BudgetListProps {
    operation: BudgetItemOperation
}

const BudgetList = ({ operation }: BudgetListProps) => {
    const addNewBudgetItem = () => {}

    useEffect(() => {
        console.log(operation)
    }, [operation])

    return (
        <div className="flex-1 overflow-scroll">
            <BudgetItem />
        </div>
    )
}

export default BudgetList
