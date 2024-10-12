import {
    RefObject,
    useRef,
    useState,
    FocusEvent,
    FormEvent,
    ChangeEvent,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react'
import clsx from 'clsx'
import Checkbox from '@/components/atoms/Checkbox/Checkbox'
import TextArea from '@/components/atoms/TextArea/TextArea'
import { ADD, BudgetItemDetails } from '@/types/BudgetTypes'
import DeleteIcon from '@/svgs/delete.svg'
import styles from './BudgetItem.module.css'

import { formatAmountWithCurrency } from '@/utils/format'

interface BudgetItemInterface {
    budgetItem: BudgetItemDetails
    isDefault?: boolean
    handleDelete?: (id: string) => void
    handleUpdate?: (
        id: string,
        key: keyof BudgetItemDetails,
        value: string
    ) => void
}

const BudgetItem = ({
    budgetItem,
    isDefault = false,
    handleDelete,
    handleUpdate,
}: BudgetItemInterface) => {
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const amountRef = useRef<HTMLTextAreaElement>(null)
    const [amount, setAmount] = useState<string>()
    const [description, setDescription] = useState<string>()

    const {
        id,
        description: defaultDescription,
        amount: budgettedAmount,
        operation,
    } = budgetItem

    useEffect(() => {
        setDescription(defaultDescription)
        if (budgettedAmount) {
            const formattedAmount = formatAmountWithCurrency(budgettedAmount)
            setAmount(formattedAmount)
        }
    }, [])

    const updateDescriptionField = (e: FormEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget as HTMLTextAreaElement
        setDescription(value)
    }

    const handleChange = (ref: RefObject<HTMLTextAreaElement>) => {
        if (
            descriptionRef.current &&
            amountRef.current &&
            ref.current &&
            ref.current.scrollHeight > 60
        ) {
            if (
                descriptionRef.current.scrollHeight >
                amountRef.current.scrollHeight
            ) {
                descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`
                amountRef.current.style.height = `${descriptionRef.current.scrollHeight}px`
            } else {
                descriptionRef.current.style.height = `${amountRef.current.scrollHeight}px`
                amountRef.current.style.height = `${amountRef.current.scrollHeight}px`
            }
        }
    }

    const handleAmountFieldFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        const amountValue = e.target.value
        const parsedFormattedCurrency = amountValue.replace(/[^0-9.-]+/g, '')
        setAmount(() =>
            parseInt(parsedFormattedCurrency) === 0
                ? ''
                : parsedFormattedCurrency
        )
    }

    const handleAmountInput = (e: FormEvent<HTMLTextAreaElement>) => {
        const { value } = e.currentTarget as HTMLTextAreaElement
        setAmount(value)
        handleUpdate && handleUpdate(id, 'amount', value || '0')
    }

    const handleAmountFieldOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        const amountValue = e.target.value
        if (amountValue === '' || parseInt(amountValue) === 0) {
            setAmount('')
            return
        }
        const formattedAmount = formatAmountWithCurrency(amountValue)
        setAmount(formattedAmount)
    }

    const handleCheckboxToggle = (e: ChangeEvent) => {
        const { checked } = e.target as HTMLInputElement
        console.log({ checked })
    }

    return (
        <div className="flex items-center">
            {!isDefault && (
                <DeleteIcon
                    className="absolute left-0 w-[20px] h-[20px] cursor-pointer"
                    onClick={() => handleDelete && handleDelete(id)}
                />
            )}
            <div className="relative w-full">
                {!isDefault && (
                    <Checkbox
                        className={styles.checkbox}
                        onChange={handleCheckboxToggle}
                    />
                )}
                <div className="flex w-full">
                    <TextArea
                        ref={descriptionRef}
                        className={styles.descriptionField}
                        onChange={() => handleChange(descriptionRef)}
                        onBlur={() =>
                            handleUpdate &&
                            handleUpdate(id, 'description', description || '')
                        }
                        onInput={updateDescriptionField}
                        value={description}
                    />
                    <TextArea
                        ref={amountRef}
                        className={clsx(
                            styles.amountField,
                            operation === ADD
                                ? '!border-r-lightteal'
                                : '!border-r-red'
                        )}
                        onChange={() => handleChange(amountRef)}
                        onBlur={handleAmountFieldOnBlur}
                        onFocus={handleAmountFieldFocus}
                        onInput={handleAmountInput}
                        value={amount}
                        disabled={isDefault}
                    />
                </div>
            </div>
        </div>
    )
}

export default BudgetItem
