'use client'
import { useState } from 'react'
import Button from '@/components/atoms/Button/Button'
import AddIcon from '@/svgs/add.svg'
import NewBudgetModal from '@/components/template/NewBudgetModal/NewBudgetModal'
import UpdateCurrencyModal from '@/components/template/UpdateCurrencyModal/UpdateCurrencyModal'

export default function App() {
    const [openBudgetModal, setOpenBudgetModal] = useState(false)
    const hasDefaultCurrency = false

    const handleCreateNewBudget = () => {
        setOpenBudgetModal(true)
    }

    return (
        <div className="p-5 flex flex-col bg-off-white">
            <Button
                type="button"
                label="Add new budget"
                icon={<AddIcon className="w-5 h-5 text-grayblack" />}
                onClick={handleCreateNewBudget}
                className="self-end"
            />
            <UpdateCurrencyModal hasDefaultCurrency={hasDefaultCurrency} />
            {openBudgetModal && (
                <NewBudgetModal setOpenBudgetModal={setOpenBudgetModal} />
            )}
        </div>
    )
}
