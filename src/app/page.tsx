'use client'
import { useState } from 'react'
import AllBudgets from '@/components/sections/AllBudgets/AllBudgets'
import Hero from '@/components/sections/Hero/Hero'
import BudgetModal from '@/components/template/BudgetModal/BudgetModal'
import { Budget } from '@/utils/types'

export default function App() {
    const [openBudgetModal, setOpenBudgetModal] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
    const [isBudgetSaved, setIsBudgetSaved] = useState(false)

    return (
        <div className="bg-off-white">
            <Hero
                setOpenBudgetModal={setOpenBudgetModal}
                setSelectedBudget={setSelectedBudget}
            />
            <AllBudgets
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
