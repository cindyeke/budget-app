'use client'
import clsx from 'clsx'
import { useState } from 'react'
import Budgets from '@/components/organisms/Budgets/Budgets'
import Banner from '@/components/sections/Banner/Banner'
import NewBudgetModal from '@/components/template/NewBudgetModal/NewBudgetModal'

export default function App() {
    const [openBudgetModal, setOpenBudgetModal] = useState(false)
    const [isBudgetSaved, setIsBudgetSaved] = useState(false)

    return (
        <div
            className={clsx('bg-off-white', {
                'overflow-hidden': openBudgetModal,
            })}
        >
            <Banner setOpenBudgetModal={setOpenBudgetModal} />
            <Budgets
                isBudgetSaved={isBudgetSaved}
                openBudgetModal={openBudgetModal}
                setIsBudgetSaved={setIsBudgetSaved}
            />
            <NewBudgetModal
                openBudgetModal={openBudgetModal}
                setOpenBudgetModal={setOpenBudgetModal}
                setIsBudgetSaved={setIsBudgetSaved}
            />
        </div>
    )
}
