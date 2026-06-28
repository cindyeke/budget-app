import Section from '@/components/template/Section/Section'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const Budgets = ({
    isBudgetSaved,
    openBudgetModal,
    setOpenBudgetModal,
    setIsBudgetSaved,
}: {
    isBudgetSaved: boolean
    openBudgetModal: boolean
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
    setIsBudgetSaved: Dispatch<SetStateAction<boolean>>
}) => {
    const [budgets, setBudgets] = useState<{ id: string; title: string }[]>([])
    const budgetList = useRef<HTMLDivElement>(null)

    const openBudget = () => setOpenBudgetModal(true)

    useEffect(() => {
        const storedBudgets = localStorage.getItem('budgets')
        if (storedBudgets) {
            const budg = JSON.parse(storedBudgets)
            setBudgets(budg)
        }
    }, [])

    useEffect(() => {
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
    }, [openBudgetModal])

    return (
        <Section>
            <div ref={budgetList} className="h-[95%] overflow-y-scroll">
                <h2 className="text-[40px] leading-[45px] mb-8">
                    all your budgets
                </h2>
                <div className="flex flex-col overflow-y-scroll h-[80%] content-start gap-y-2">
                    {budgets.map(({ id, title }) => (
                        <button
                            type="button"
                            key={id}
                            onClick={openBudget}
                            className="flex justify-between text-lightteal p-3 border-b border-b-gray/30 last:border-b-0 last:pb-10"
                        >
                            <span className="text-left capitalize">
                                {title}
                            </span>
                            <span className="text-xs self-end">
                                created 01/04/2026
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Budgets
