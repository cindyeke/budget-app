'use client'
import { useState } from 'react'
import Budgets from '@/components/organisms/Budgets/Budgets'
import Banner from '@/components/sections/Banner/Banner'
import BudgetModal from '@/components/template/BudgetModal/BudgetModal'
import { Budget } from '@/types/BudgetTypes'

export default function App() {
    const [openBudgetModal, setOpenBudgetModal] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
    const [isBudgetSaved, setIsBudgetSaved] = useState(false)

    return (
        <div className="bg-off-white">
            <Banner
                setOpenBudgetModal={setOpenBudgetModal}
                setSelectedBudget={setSelectedBudget}
            />
            <Budgets
                isBudgetSaved={isBudgetSaved}
                openBudgetModal={openBudgetModal}
                setOpenBudgetModal={setOpenBudgetModal}
                setIsBudgetSaved={setIsBudgetSaved}
                setSelectedBudget={setSelectedBudget}
            />
            <BudgetModal
                openBudgetModal={openBudgetModal}
                setOpenBudgetModal={setOpenBudgetModal}
                setIsBudgetSaved={setIsBudgetSaved}
                selectedBudget={selectedBudget}
            />
        </div>
    )
}
