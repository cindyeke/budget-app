import clsx from 'clsx'
import H1 from '../atoms/H1/H1'
import Modal from './Modal/Modal'
import ModalContent from './Modal/ModalContent'
import AddNewBudgetItemButtons from './NewBudgetModal/AddNewBudgetItemButtons'
import BudgetList from '../organisms/BudgetList/BudgetList'
import ModalControlButtons from './Modal/ModalControlButtons'
import { FormProvider } from 'react-hook-form'

const EditBudgetModal = () => {


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
                <div
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
                                Title Here ...
                            </H1>
                            <AddNewBudgetItemButtons
                                handleAddBtn={handleAddBtn}
                                handleDeductBtn={handleDeductBtn}
                            />
                        </div>

                        <BudgetList
                            isAddNewButtonClicked={isAddNewButtonClicked}
                            setIsAddNewButtonClicked={setIsAddNewButtonClicked}
                            newBudgetDetails={newBudgetDetails}
                            operation={budgetItemOperation}
                            setBudgetList={setBudgetList}
                            budgetList={budgetList}
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
                </div>
            </FormProvider>
        </Modal>
    )
}

export default EditBudgetModal
