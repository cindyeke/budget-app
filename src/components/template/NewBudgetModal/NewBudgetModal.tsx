import { Dispatch, SetStateAction, useState } from 'react'
import TextField from '@/components/atoms/TextField/TextField'
import Modal from '../Modal/Modal'
import BudgetCard from '@/components/organisms/BudgetCard/BudgetCard'
import ModalContent from '../Modal/ModalContent'
import ModalControlButtons from '../Modal/ModalControlButtons'
import H1 from '@/components/atoms/H1/H1'
import InfoCircle from '@/svgs/info-circle.svg'
import TextArea from '@/components/atoms/TextArea/TextArea'

interface NewBudgetModalProps {
    openBudgetModal: boolean
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
}

const textFieldStyle = 'mt-4'

const NewBudgetModal = ({
    openBudgetModal,
    setOpenBudgetModal,
}: NewBudgetModalProps) => {
    const [step, setStep] = useState(0)
    const [isSavingNewBudget, setIsSavingNewBudget] = useState(false)

    const handleGoBackToPrevStep = () => {
        step !== 0 && setStep((step) => step - 1)
    }

    const handleContinueStep = () => {
        if (step < 3) {
            if (step === 2) {
                setIsSavingNewBudget(true)
                return
            }
            setStep((step) => step + 1)
        } else {
            console.log('saving budget ...')
        }
    }

    const refresh = () => {
        setStep(0)
    }

    const handleCloseModal = () => {
        setOpenBudgetModal(false)
        refresh()
    }

    return (
        <>
            {openBudgetModal && (
                <Modal
                    handleClose={handleCloseModal}
                    groupedContentClassName="p-10"
                >
                    <ModalContent>
                        <H1 className="font-bold">Create a new budget</H1>
                        {step === 0 && (
                            <TextField
                                type="number"
                                placeholder="Expected income"
                                className={textFieldStyle}
                            />
                        )}
                        {step === 1 && (
                            <TextField
                                type="text"
                                placeholder="Budget name"
                                className={textFieldStyle}
                            />
                        )}
                        {step === 2 && (
                            <>
                                <TextArea
                                    placeholder="Budget description"
                                    className={textFieldStyle}
                                />
                                <div className="flex items-start gap-x-2 mt-2">
                                    <div>
                                        <InfoCircle className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        Feel free to skip this part if
                                        describing things isn't your cup of tea
                                        <span className="ml-1">
                                            {String.fromCodePoint(
                                                parseInt('0x1f605', 16)
                                            )}
                                        </span>
                                        . Remember, you can edit the budget
                                        description at any time in the future.
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 3 && <BudgetCard />}
                    </ModalContent>
                    {step !== undefined && (
                        <ModalControlButtons
                            step={step}
                            handleContinueStep={handleContinueStep}
                            handleGoBackToPrevStep={handleGoBackToPrevStep}
                            nextBtnLabel={step >= 3 ? 'Save' : 'Continue'}
                            omitPrevBtn={step === 0}
                            isLoading={isSavingNewBudget}
                            // btnClassName="border-none bg-off-white"
                        />
                    )}
                </Modal>
            )}
        </>
    )
}

export default NewBudgetModal
