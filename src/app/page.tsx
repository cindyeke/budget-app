'use client'
import { useState } from 'react'
import Button from '@/components/atoms/Button/Button'
import TextField from '@/components/atoms/TextField/TextField'
import BudgetCard from '@/components/organisms/BudgetCard/BudgetCard'
import Modal from '@/components/template/Modal/Modal'
import AddIcon from '@/svgs/add.svg'
import NewBudgetModal from '@/components/template/NewBudgetModal/NewBudgetModal'
import UpdateCurrencyModal from '@/components/template/UpdateCurrencyModal/UpdateCurrencyModal'

export default function App() {
    const [openBudgetModal, setOpenBudgetModal] = useState(false)
    const [openCurrencyModal, setOpenCurrencyModal] = useState(false)
    const hasDefaultCurrency = false

    const handleCreateNewBudget = () => {
        // if (!hasDefaultCurrency) {
        //     return
        // }

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
            <NewBudgetModal
                openBudgetModal={openBudgetModal}
                setOpenBudgetModal={setOpenBudgetModal}
            />
        </div>
    )
}
