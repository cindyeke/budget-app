import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
    BudgetItemOperation,
    ADD,
    DEDUCT,
    NewBudgetInputs,
    SUBMIT,
    NewBudgetDetails,
    BudgetItemDetails,
} from '@/types/BudgetTypes'
import Modal from '../Modal/Modal'
import BudgetList from '@/components/organisms/BudgetList/BudgetList'
import ModalContent from '../Modal/ModalContent'
import ModalControlButtons from '../Modal/ModalControlButtons'
import H1 from '@/components/atoms/H1/H1'
import AddIcon from '@/svgs/add.svg'
import MinusIcon from '@/svgs/minus.svg'
import Button from '@/components/atoms/Button/Button'
import { StepOne, StepThree, StepTwo } from './NewBudgetSteps'

const addBudgetButtonStyles =
    '!p-0 !gap-x-0 !border-0 !w-10 !h-10 !rounded-[50%]'
const addBudgetIconStyles = 'w-8 h-8 text-off-white'

interface NewBudgetModalProps {
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
}

const defaultNewBudgetDetails = {
    id: '',
    title: '',
    income: '',
}

const NewBudgetModal = ({ setOpenBudgetModal }: NewBudgetModalProps) => {
    const [step, setStep] = useState(1)
    const [newBudgetDetails, setNewBudgetDetails] = useState<NewBudgetDetails>(
        defaultNewBudgetDetails
    )
    const [budgetTitle, setBudgetTitle] = useState('')
    const [isSavingNewBudget, setIsSavingNewBudget] = useState(false)
    const [isAddNewButtonClicked, setIsAddNewButtonClicked] = useState(false)
    const [budgetItemOperation, setBudgetItemOperation] =
        useState<BudgetItemOperation>(ADD)
    const [budgetList, setBudgetList] = useState<BudgetItemDetails[]>([])

    const formMethods = useForm<NewBudgetInputs>({
        defaultValues: defaultNewBudgetDetails,
    })

    const handleGoBackToPrevStep = () => {
        step !== 1 && setStep((step) => step - 1)
    }

    const handleNewBudget: SubmitHandler<NewBudgetInputs> = ({
        income,
        title,
    }) => {
        if (step === 4) {
            setIsSavingNewBudget(true)
            const storedBudgetList = localStorage.getItem('budgets')

            let stringifiedBudgetList
            const uniqueBudget = {
                id: uuidv4(),
                income,
                title,
                list: budgetList,
            }
            setTimeout(() => {
                if (storedBudgetList) {
                    const parsedBudgetList = JSON.parse(storedBudgetList)
                    stringifiedBudgetList = JSON.stringify([
                        ...parsedBudgetList,
                        uniqueBudget,
                    ])
                } else {
                    stringifiedBudgetList = JSON.stringify([uniqueBudget])
                }

                localStorage.setItem('budgets', stringifiedBudgetList)

                setIsSavingNewBudget(false)
                handleCloseModal()
            }, 1000)
        }
        if (step === 3) {
            setIsSavingNewBudget(true)
            setTimeout(() => {
                setNewBudgetDetails({
                    id: uuidv4(),
                    title,
                    income,
                })
                setIsSavingNewBudget(false)
                handleContinueStep()
            }, 1000)
        }
        if (step < 3) {
            handleContinueStep()
        }
    }

    const handleContinueStep = () => setStep((step) => step + 1)

    const refresh = () => {
        setStep(1)
    }

    const handleCloseModal = () => {
        setOpenBudgetModal(false)
        refresh()
    }

    const title = (budgetTitle: string): string => {
        const budgetKeyword = 'budget'
        const transformedTitle = budgetTitle.toLowerCase()
        const trimmedTitle = transformedTitle.includes(budgetKeyword)
            ? transformedTitle.replace(budgetKeyword, '')
            : transformedTitle
        return `${step >= 4 ? trimmedTitle.trim() : 'Create a new'} budget`
    }

    const handleAddBtn = () => {
        setIsAddNewButtonClicked(true)
        setBudgetItemOperation(ADD)
    }

    const handleDeductBtn = () => {
        setIsAddNewButtonClicked(true)
        setBudgetItemOperation(DEDUCT)
    }

    useEffect(() => {
        setBudgetTitle(() => title(newBudgetDetails.title))
    }, [newBudgetDetails.title])

    return (
        <Modal
            handleClose={handleCloseModal}
            modalClassName="sm:!w-[550px] sm:!h-[70vh] sm:rounded-[20px]"
            groupedContentClassName={`${step <= 3 ? 'p-5' : 'py-5'} overflow-scroll`}
        >
            <FormProvider {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit(handleNewBudget)}
                    className="flex flex-col flex-1 overflow-scroll"
                >
                    <ModalContent className="flex flex-col">
                        <div
                            className={`flex mb-2 items-center justify-between ${step === 4 && 'pl-8 pr-5'}`}
                        >
                            <H1
                                className={clsx('font-bold !mb-0', {
                                    'w-[70%] capitalize': step > 3,
                                })}
                            >
                                {budgetTitle}
                            </H1>
                            {step > 3 && (
                                <AddNewBudgetItemButtons
                                    handleAddBtn={handleAddBtn}
                                    handleDeductBtn={handleDeductBtn}
                                />
                            )}
                        </div>

                        {step === 1 && <StepOne />}
                        {step === 2 && <StepTwo />}
                        {step === 3 && <StepThree />}

                        {step === 4 && (
                            <BudgetList
                                isAddNewButtonClicked={isAddNewButtonClicked}
                                setIsAddNewButtonClicked={
                                    setIsAddNewButtonClicked
                                }
                                newBudgetDetails={newBudgetDetails}
                                operation={budgetItemOperation}
                                setBudgetList={setBudgetList}
                                budgetList={budgetList}
                            />
                        )}
                    </ModalContent>
                    <ModalControlButtons
                        step={step}
                        handleGoBackToPrevStep={handleGoBackToPrevStep}
                        nextBtnLabel={step >= 3 ? 'Save' : 'Continue'}
                        omitPrevBtn={step === 1 || step === 4}
                        nextBtnType={SUBMIT}
                        isLoading={isSavingNewBudget}
                        className={`${step === 4 && 'px-5'}`}
                    />
                </form>
            </FormProvider>
        </Modal>
    )
}

const AddNewBudgetItemButtons = ({
    handleAddBtn,
    handleDeductBtn,
}: {
    handleAddBtn: () => void
    handleDeductBtn: () => void
}) => {
    return (
        <div className="flex flex-1 justify-between max-w-[96px]">
            <Button
                type="button"
                icon={<AddIcon className={addBudgetIconStyles} />}
                className={clsx(addBudgetButtonStyles, '!bg-lightteal')}
                onClick={handleAddBtn}
            />
            <Button
                type="button"
                icon={<MinusIcon className={addBudgetIconStyles} />}
                className={clsx(addBudgetButtonStyles, 'bg-red')}
                onClick={handleDeductBtn}
            />
        </div>
    )
}

export default NewBudgetModal
