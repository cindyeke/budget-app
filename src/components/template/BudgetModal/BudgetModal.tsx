import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
    BudgetItemOperation,
    ADD,
    DEDUCT,
    Budget,
    SUBMIT,
    BudgetItemDetails,
} from '@/utils/types'
import Modal from '@/components/template/Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import ModalControlButtons from '@/components/template/Modal/ModalControlButtons'
import H1 from '@/components/atoms/H1/H1'
import BudgetSteps from './BudgetSteps'
import BudgetControlButton from './BudgetControlButton'
import TextField from '@/components/atoms/TextField/TextField'

interface NewBudgetModalProps {
    openBudgetModal: boolean
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
    setIsBudgetSaved: Dispatch<SetStateAction<boolean>>
    selectedBudget: Budget | null
}

const defaultNewBudgetDetails = {
    id: '',
    title: '',
    income: '',
    currency: 'NGN',
}

const BudgetModal = ({
    openBudgetModal,
    setOpenBudgetModal,
    setIsBudgetSaved,
    selectedBudget,
}: NewBudgetModalProps) => {
    const [step, setStep] = useState(1)
    const [budgetDetails, setBudgetDetails] = useState<Budget>(
        defaultNewBudgetDetails
    )
    const [isSavingNewBudget, setIsSavingNewBudget] = useState(false)
    const [isAddNewButtonClicked, setIsAddNewButtonClicked] = useState(false)
    const [budgetItemOperation, setBudgetItemOperation] =
        useState<BudgetItemOperation>(ADD)
    const [budgetList, setBudgetList] = useState<BudgetItemDetails[]>([])

    const formMethods = useForm<Budget>({
        defaultValues: defaultNewBudgetDetails,
    })

    const date = new Date()
    const todaysDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const handleGoBackToPrevStep = () => {
        step !== 1 && setStep((step) => step - 1)
    }

    const handleNextButton: SubmitHandler<Budget> = ({
        income,
        title,
        currency,
    }) => {
        if (step === 4) {
            setIsSavingNewBudget(true)
            const storedBudgetList = localStorage.getItem('budgets')

            let stringifiedBudgetList

            if (selectedBudget && storedBudgetList) {
                const parsedBudgetList: Budget[] = JSON.parse(storedBudgetList)
                const transformedBudgetList = parsedBudgetList.map(
                    (budgetItem) =>
                        budgetItem.id === selectedBudget.id
                            ? {
                                  ...budgetItem,
                                  list: budgetList,
                                  updatedAt: todaysDate,
                                  title,
                              }
                            : budgetItem
                )
                setTimeout(() => {
                    stringifiedBudgetList = JSON.stringify(
                        transformedBudgetList
                    )

                    localStorage.setItem('budgets', stringifiedBudgetList)
                    handleCloseModal()
                    setIsBudgetSaved(true)
                }, 1000)
            } else {
                const uniqueBudget: Budget = {
                    id: uuidv4(),
                    income,
                    title,
                    currency,
                    list: budgetList,
                    createdAt: todaysDate,
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
                    handleCloseModal()
                    setIsBudgetSaved(true)
                }, 1000)
            }
        }
        if (step === 3) {
            setIsSavingNewBudget(true)
            setTimeout(() => {
                setBudgetDetails({
                    id: uuidv4(),
                    title,
                    income,
                    currency,
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
        setIsSavingNewBudget(false)
        formMethods.reset()
        setStep(1)
        setIsAddNewButtonClicked(false)
        setBudgetItemOperation(ADD)
        setBudgetList([])
        setIsEditingTitle(false)
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

    // const handleDuplicateBudgetItem = () => {
    //     let stringifiedBudgetList
    //     const storedBudgetList = localStorage.getItem('budgets')

    //     const uniqueBudget: Budget = {
    //         id: uuidv4(),
    //         income: budgetDetails.income,
    //         title: `${budgetDetails.title}_copy`,
    //         list: budgetList,
    //         createdAt: todaysDate,
    //     }

    //     if (storedBudgetList) {
    //         const parsedBudgetList = JSON.parse(storedBudgetList)

    //         console.log({ parsedBudgetList })
    //         stringifiedBudgetList = JSON.stringify([
    //             ...parsedBudgetList,
    //             uniqueBudget,
    //         ])
    //     } else {
    //         stringifiedBudgetList = JSON.stringify([uniqueBudget])
    //     }

    //     localStorage.setItem('budgets', stringifiedBudgetList)

    //     // show duplicate successful notification!
    // }

    const [isEditingTitle, setIsEditingTitle] = useState(false)

    const handleEditBudgetTitle = () => {
        setIsEditingTitle(true)
        formMethods.setValue('title', '')
    }

    useEffect(() => {
        if (selectedBudget) {
            setStep(4)
            if (selectedBudget.list) {
                setBudgetDetails({
                    id: selectedBudget.id,
                    title: selectedBudget.title,
                    income: selectedBudget.income,
                    currency: selectedBudget.currency,
                })
                setBudgetList(selectedBudget.list)
            }
        } else {
            setStep(1)
        }
    }, [selectedBudget])

    return (
        <Modal
            handleClose={handleCloseModal}
            modalClassName={clsx(
                'sm:!w-[550px] sm:!h-[70vh] sm:rounded-[20px] transform transition-opacity duration-1000',
                {
                    'opacity-100 ': openBudgetModal,
                    'opacity-0': !openBudgetModal,
                }
            )}
            groupedContentClassName={`${step <= 3 ? 'p-5' : 'py-5'} overflow-scroll`}
            isOpen={openBudgetModal}
        >
            <FormProvider {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit(handleNextButton)}
                    className="flex flex-col flex-1 overflow-scroll"
                >
                    <ModalContent className="flex flex-col">
                        <div
                            className={`flex mb-2 items-center justify-between ${step === 4 && 'pl-8 pr-5'}`}
                        >
                            {isEditingTitle ? (
                                <TextField
                                    type="text"
                                    placeholder="Enter new title"
                                    name="title"
                                    register={formMethods.register}
                                    className="font-bold text-xl bg-transparent outline-none w-[70%] !border-0 ..."
                                />
                            ) : (
                                <H1 className="font-bold !mb-0 text-xl w-[70%] capitalize">
                                    {title(budgetDetails.title)}
                                </H1>
                            )}
                            {step > 3 && (
                                <BudgetControlButton
                                    selectedBudget={selectedBudget}
                                    handleAddBtn={handleAddBtn}
                                    handleDeductBtn={handleDeductBtn}
                                    handleEditBudgetTitle={
                                        handleEditBudgetTitle
                                    }
                                />
                            )}
                        </div>

                        <BudgetSteps
                            step={step}
                            isAddNewButtonClicked={isAddNewButtonClicked}
                            setIsAddNewButtonClicked={setIsAddNewButtonClicked}
                            budgetItemOperation={budgetItemOperation}
                            setBudgetList={setBudgetList}
                            budgetList={budgetList}
                            newBudgetDetails={budgetDetails}
                        />
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

export default BudgetModal
