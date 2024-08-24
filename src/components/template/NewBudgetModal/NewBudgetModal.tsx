import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import TextField from '@/components/atoms/TextField/TextField'
import Modal from '../Modal/Modal'
import BudgetList from '@/components/organisms/BudgetList/BudgetList'
import ModalContent from '../Modal/ModalContent'
import ModalControlButtons from '../Modal/ModalControlButtons'
import H1 from '@/components/atoms/H1/H1'
import InfoCircle from '@/svgs/info-circle.svg'
import AddIcon from '@/svgs/add.svg'
import MinusIcon from '@/svgs/minus.svg'
import TextArea from '@/components/atoms/TextArea/TextArea'
import Button from '@/components/atoms/Button/Button'
import { BudgetItemOperation, ADD, DEDUCT } from '@/types/BudgetTypes'

interface NewBudgetModalProps {
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
}

const textFieldStyle = 'mt-4'
const addBudgetButtonStyles =
    '!p-0 !gap-x-0 !border-0 !w-10 !h-10 !rounded-[50%]'
const addBudgetIconStyles = 'w-8 h-8 text-off-white'

const NewBudgetModal = ({ setOpenBudgetModal }: NewBudgetModalProps) => {
    const [step, setStep] = useState(1)
    const [isSavingNewBudget, setIsSavingNewBudget] = useState(false)
    const [budgetItemOperation, setBudgetItemOperation] =
        useState<BudgetItemOperation>(ADD)

    const handleGoBackToPrevStep = () => {
        step !== 1 && setStep((step) => step - 1)
    }

    const handleContinueStep = () => {
        const calculatedStep = step + 1

        if (calculatedStep === 4) {
            setIsSavingNewBudget(true)
            setTimeout(() => {
                setIsSavingNewBudget(false)
                setStep((step) => step + 1)
            }, 0)
        } else {
            setStep((step) => step + 1)
        }
    }

    const refresh = () => {
        setStep(1)
    }

    const handleCloseModal = () => {
        setOpenBudgetModal(false)
        refresh()
    }

    const title = `${step >= 4 ? 'Grocery' : 'Create a new'} budget` // the actual name of the will replace 'Edit'. ie. Grocery budget

    return (
        <Modal
            handleClose={handleCloseModal}
            groupedContentClassName="p-5 overflow-scroll"
        >
            <ModalContent className="flex flex-col">
                <div className="flex mb-2 items-center">
                    <H1
                        className={clsx('font-bold !mb-0', {
                            'w-3/4': step > 3,
                        })}
                    >
                        {title}
                    </H1>
                    {step > 3 && (
                        <div className="flex flex-1 justify-between">
                            <Button
                                type="button"
                                icon={
                                    <AddIcon className={addBudgetIconStyles} />
                                }
                                className={clsx(
                                    addBudgetButtonStyles,
                                    '!bg-lightteal'
                                )}
                                onClick={() => setBudgetItemOperation(ADD)}
                            />
                            <Button
                                type="button"
                                icon={
                                    <MinusIcon
                                        className={addBudgetIconStyles}
                                    />
                                }
                                className={clsx(
                                    addBudgetButtonStyles,
                                    'bg-red'
                                )}
                                onClick={() => setBudgetItemOperation(DEDUCT)}
                            />
                        </div>
                    )}
                </div>

                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
                {step === 4 && <BudgetList operation={budgetItemOperation} />}
            </ModalContent>
            {step !== undefined && (
                <ModalControlButtons
                    step={step}
                    handleContinueStep={handleContinueStep}
                    handleGoBackToPrevStep={handleGoBackToPrevStep}
                    nextBtnLabel={step >= 3 ? 'Save' : 'Continue'}
                    omitPrevBtn={step === 1 || step === 4}
                    isLoading={isSavingNewBudget}
                />
            )}
        </Modal>
    )
}

const StepOne = () => {
    return (
        <TextField
            type="number"
            placeholder="Expected income"
            className={textFieldStyle}
        />
    )
}

const StepTwo = () => {
    return (
        <TextField
            type="text"
            placeholder="Budget name"
            className={textFieldStyle}
        />
    )
}

const StepThree = () => {
    return (
        <>
            <TextArea
                placeholder="Budget description"
                className={clsx(textFieldStyle, 'h-[150px]')}
            />
            <div className="flex items-start gap-x-2 mt-2">
                <div>
                    <InfoCircle className="w-5 h-5" />
                </div>
                <div className="text-sm">
                    Feel free to skip this part if describing things isn't your
                    cup of tea
                    <span className="ml-1">
                        {String.fromCodePoint(parseInt('0x1f605', 16))}
                    </span>
                    . Remember, you can edit the budget description at any time
                    in the future.
                </div>
            </div>
        </>
    )
}

export default NewBudgetModal
