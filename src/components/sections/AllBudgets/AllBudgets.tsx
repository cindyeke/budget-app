import { v4 as uuidv4 } from 'uuid'
import Section from '@/components/template/Section/Section'
import { Budget } from '@/utils/types'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import InfoCircle from '@/svgs/info-circle.svg'
import DuplicateIcon from '@/svgs/duplicate.svg'
import DeleteIcon from '@/svgs/delete.svg'

const Budgets = ({
    isBudgetSaved,
    openBudgetModal,
    setOpenBudgetModal,
    setIsBudgetSaved,
    setSelectedBudget,
}: {
    isBudgetSaved: boolean
    openBudgetModal: boolean
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
    setIsBudgetSaved: Dispatch<SetStateAction<boolean>>
    setSelectedBudget: Dispatch<SetStateAction<Budget | null>>
}) => {
    const [budgets, setBudgets] = useState<Budget[]>([])
    const budgetList = useRef<HTMLDivElement>(null)

    const openBudget = (budget: Budget) => {
        setOpenBudgetModal(true)
        setSelectedBudget(budget)
    }

    const handleDuplicateBudget = (id: string) => {
        const storedBudgetList = localStorage.getItem('budgets')

        if (!storedBudgetList) return

        const parsedBudgetList = JSON.parse(storedBudgetList) as Budget[]
        let selectedBudget = parsedBudgetList.find((budget) => budget.id === id)

        if (!selectedBudget) return

        const newBudget = {
            ...selectedBudget,
            title: `${selectedBudget.title}_copy`,
            id: uuidv4(),
        }

        const updatedBudgetList = [...parsedBudgetList, newBudget]

        localStorage.setItem('budgets', JSON.stringify(updatedBudgetList))
        setBudgets(updatedBudgetList)
    }

    const handleDeleteBudget = (id: string) => {
        const storedBudgetList = localStorage.getItem('budgets')

        if (!storedBudgetList) return

        const parsedBudgetList = JSON.parse(storedBudgetList) as Budget[]
        const updatedBudgetList = parsedBudgetList.filter(
            (budget) => budget.id !== id
        )

        if (updatedBudgetList.length === parsedBudgetList.length) return

        localStorage.setItem('budgets', JSON.stringify(updatedBudgetList))
        setBudgets(updatedBudgetList)
        setSelectedBudget((current) => (current?.id === id ? null : current))
    }

    useEffect(() => {
        const storedBudgets = localStorage.getItem('budgets')
        if (storedBudgets) {
            const budgets = JSON.parse(storedBudgets)
            setBudgets(budgets)

            if (
                budgets.length > 0 &&
                isBudgetSaved &&
                !openBudgetModal &&
                budgetList.current
            ) {
                budgetList.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setIsBudgetSaved(false)
            }
        }
    }, [openBudgetModal])

    return (
        <Section>
            <div ref={budgetList} className="h-[95%] overflow-y-scroll">
                <h2 className="text-[40px] leading-[45px] mb-8">all budgets</h2>
                <div className="flex justify-end text-lightteal p-3 border-b border-b-gray/30 last:border-b-0 last:pb-10 text-xs"></div>
                <div className="flex flex-col overflow-y-scroll h-[80%] content-start gap-y-2">
                    {budgets.map((budget) => (
                        <div
                            key={budget.id}
                            className="flex justify-between items-center text-lightteal p-3 border-b border-b-gray/30 last:border-b-0 last:pb-10"
                        >
                            <button
                                className="text-left capitalize"
                                onClick={() => openBudget(budget)}
                            >
                                {budget.title}
                            </button>
                            <div className="flex gap-x-2 text-xs text-black items-center">
                                <InfoCircle className="w-5 h-5" />
                                <DuplicateIcon
                                    className="w-5 h-5"
                                    onClick={() =>
                                        handleDuplicateBudget(budget.id ?? '')
                                    }
                                />
                                <DeleteIcon
                                    className="w-4 h-4"
                                    onClick={() =>
                                        handleDeleteBudget(budget.id ?? '')
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Budgets
