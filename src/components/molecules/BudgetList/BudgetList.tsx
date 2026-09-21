import { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import BudgetItem from '@/components/molecules/BudgetItem/BudgetItem'
import {
    BudgetItemOperation,
    Budget,
    BudgetItemDetails,
    ADD,
} from '@/utils/types'
import Equations from '../Equations/Equations'

interface BudgetListProps {
    newBudgetDetails: Budget
    isAddNewButtonClicked: boolean
    operation: BudgetItemOperation
    setIsAddNewButtonClicked: Dispatch<SetStateAction<boolean>>
    budgetList: BudgetItemDetails[]
    setBudgetList: Dispatch<SetStateAction<BudgetItemDetails[]>>
}

interface SortableBudgetItemProps {
    currency: string
    budgetItem: BudgetItemDetails
    handleDelete: (id: string) => void
    handleUpdate: (
        id: string,
        key: keyof BudgetItemDetails,
        value: string
    ) => void
}

const SortableBudgetItem = ({
    currency,
    budgetItem,
    handleDelete,
    handleUpdate,
}: SortableBudgetItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: budgetItem.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className="relative">
            <div
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-8 cursor-grab touch-none active:cursor-grabbing"
                {...attributes}
                {...listeners}
            />
            <BudgetItem
                currency={currency}
                budgetItem={budgetItem}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
            />
        </div>
    )
}

const BudgetList = ({
    operation,
    newBudgetDetails,
    isAddNewButtonClicked,
    setIsAddNewButtonClicked,
    budgetList,
    setBudgetList,
}: BudgetListProps) => {
    const { id: newBudgetId, income, currency } = newBudgetDetails
    const [equationList, setEquationList] = useState<BudgetItemDetails[]>([])
    const [isAmountFieldUpdated, setIsAmountFieldUpdated] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 5 },
        })
    )

    const addNewBudgetItem = (operation: BudgetItemOperation) => {
        const newBudgetItem: BudgetItemDetails = {
            id: uuidv4(),
            amount: '',
            description: '',
            operation,
        }

        setBudgetList([...budgetList, newBudgetItem])
    }

    const updateBudgetItem = (
        id: string,
        key: keyof BudgetItemDetails,
        value: string
    ) => {
        const item = budgetList.find((item) => item.id === id)
        if (item) {
            item[key] = value

            if (key === 'amount') {
                setEquationList(budgetList)
                setIsAmountFieldUpdated(true)
            }
        }
    }

    const deleteBudgetItem = (id: string) => {
        const filteredBudgetList = budgetList.filter((item) => item.id !== id)

        setBudgetList(filteredBudgetList)
        setEquationList(filteredBudgetList)
        setIsAmountFieldUpdated(true)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        setBudgetList((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id)
            const newIndex = items.findIndex((item) => item.id === over.id)
            const reordered = arrayMove(items, oldIndex, newIndex)

            setEquationList(reordered)

            return reordered
        })
    }

    useEffect(() => {
        if (isAddNewButtonClicked) {
            addNewBudgetItem(operation)
        }
        setIsAddNewButtonClicked(false)
    }, [isAddNewButtonClicked, operation])

    useEffect(() => {
        setEquationList(budgetList)
        setIsAmountFieldUpdated(true)
    }, [])

    return (
        <div className="h-full flex flex-col mt-3 overflow-hidden">
            <div className="flex-1 overflow-scroll h-[70%] relative">
                <div className="flex-1 flex flex-col gap-y-2 pl-8 pr-5">
                    <BudgetItem
                        currency={currency}
                        budgetItem={{
                            id: newBudgetId || '',
                            description: 'Income',
                            amount: income,
                            operation: ADD,
                        }}
                        isDefault
                    />
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={budgetList.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {budgetList.map((item) => (
                                <SortableBudgetItem
                                    key={item.id}
                                    currency={currency}
                                    budgetItem={item}
                                    handleDelete={deleteBudgetItem}
                                    handleUpdate={updateBudgetItem}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <Equations
                currency={currency}
                income={Number(income)}
                equationList={equationList}
                isAmountFieldUpdated={isAmountFieldUpdated}
                setIsAmountFieldUpdated={setIsAmountFieldUpdated}
            />
        </div>
    )
}

export default BudgetList
