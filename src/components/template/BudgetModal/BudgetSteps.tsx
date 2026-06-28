import { Dispatch, SetStateAction } from 'react'
import BudgetList from '@/components/organisms/BudgetList/BudgetList'
import { StepOne, StepThree, StepTwo } from './NewBudgetSteps'
import {
    BudgetItemDetails,
    BudgetItemOperation,
    Budget,
} from '@/types/BudgetTypes'

interface BudgetStepsProps {
    step: number
    isAddNewButtonClicked: boolean
    setIsAddNewButtonClicked: Dispatch<SetStateAction<boolean>>
    budgetItemOperation: BudgetItemOperation
    budgetList: BudgetItemDetails[]
    newBudgetDetails: Budget
    setBudgetList: Dispatch<SetStateAction<BudgetItemDetails[]>>
}

const BudgetSteps = ({
    step,
    isAddNewButtonClicked,
    setIsAddNewButtonClicked,
    budgetItemOperation,
    budgetList,
    setBudgetList,
    newBudgetDetails,
}: BudgetStepsProps) => {
    return (
        <>
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}

            {step === 4 && (
                <BudgetList
                    isAddNewButtonClicked={isAddNewButtonClicked}
                    setIsAddNewButtonClicked={setIsAddNewButtonClicked}
                    newBudgetDetails={newBudgetDetails}
                    operation={budgetItemOperation}
                    setBudgetList={setBudgetList}
                    budgetList={budgetList}
                />
            )}
        </>
    )
}

export default BudgetSteps
