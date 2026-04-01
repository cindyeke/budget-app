import Section from '@/components/template/Section/Section'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const Budgets = ({
    isBudgetSaved,
    openBudgetModal,
    setIsBudgetSaved,
}: {
    isBudgetSaved: boolean
    openBudgetModal: boolean
    setIsBudgetSaved: Dispatch<SetStateAction<boolean>>
}) => {
    const [budgets, setBudgets] = useState<{ id: string; title: string }[]>([])
    const budgetList = useRef<HTMLDivElement>(null)

    const openBudgetList = () => {}

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
            <div ref={budgetList}>
                <h1>Budgets</h1>
                <div className="flex flex-col gap-y-5">
                    {budgets.map(({ id, title }) => (
                        <button
                            type="button"
                            key={id}
                            onClick={openBudgetList}
                            className="text-left"
                        >
                            {title}
                        </button>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Budgets
