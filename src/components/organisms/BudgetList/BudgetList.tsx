import { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BudgetItem from '@/components/molecules/BudgetItem/BudgetItem'
import {
    BudgetItemOperation,
    NewBudgetDetails,
    BudgetItemDetails,
    ADD,
} from '@/types/BudgetTypes'
import Equations from '../Equations/Equations'

interface BudgetListProps {
    newBudgetDetails: NewBudgetDetails
    isAddNewButtonClicked: boolean
    operation: BudgetItemOperation
    setIsAddNewButtonClicked: Dispatch<SetStateAction<boolean>>
    budgetList: BudgetItemDetails[]
    setBudgetList: Dispatch<SetStateAction<BudgetItemDetails[]>>
}

const BudgetList = ({
    operation,
    newBudgetDetails,
    isAddNewButtonClicked,
    setIsAddNewButtonClicked,
    budgetList,
    setBudgetList,
}: BudgetListProps) => {
    const { id: newBudgetId, income } = newBudgetDetails
    const [equationList, setEquationList] = useState<BudgetItemDetails[]>([])
    const [isAmountFieldUpdated, setIsAmountFieldUpdated] = useState(false)

    const addNewBudgetItem = (operation: BudgetItemOperation) => {
        const newBudgetItem: BudgetItemDetails = {
            id: uuidv4(),
            amount: '',
            description: '',
            operation,
        }

        setBudgetList([...budgetList, newBudgetItem])
    }

    const updateBudgetItem = (
        id: string,
        key: keyof BudgetItemDetails,
        value: string
    ) => {
        const item = budgetList.find((item) => item.id === id)
        if (item) {
            item[key] = value

            if (key === 'amount') {
                setEquationList(budgetList)
                setIsAmountFieldUpdated(true)
            }
        }
    }

    const deleteBudgetItem = (id: string) => {
        const filteredBudgetList = budgetList.filter((item) => item.id !== id)

        setBudgetList(filteredBudgetList)
        setEquationList(filteredBudgetList)
        setIsAmountFieldUpdated(true)
    }

    useEffect(() => {
        if (isAddNewButtonClicked) {
            addNewBudgetItem(operation)
        }
        setIsAddNewButtonClicked(false)
    }, [isAddNewButtonClicked, operation])

    return (
        <div className="h-full flex flex-col mt-3 overflow-hidden">
            <div className="flex-1 overflow-scroll h-[70%] relative">
                <div className="flex-1 flex flex-col gap-y-3 pl-8 pr-5">
                    <BudgetItem
                        budgetItem={{
                            id: newBudgetId,
                            description: 'Income',
                            amount: income,
                            operation: ADD,
                        }}
                        isDefault
                    />
                    {budgetList.map((item) => (
                        <BudgetItem
                            key={item.id}
                            budgetItem={item}
                            handleDelete={deleteBudgetItem}
                            handleUpdate={updateBudgetItem}
                        />
                    ))}
                </div>
            </div>
            <Equations
                income={Number(income)}
                equationList={equationList}
                isAmountFieldUpdated={isAmountFieldUpdated}
                setIsAmountFieldUpdated={setIsAmountFieldUpdated}
            />
        </div>
    )
}

export default BudgetList
