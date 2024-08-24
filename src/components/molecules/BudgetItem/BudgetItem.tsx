import {
    RefObject,
    useRef,
    useState,
    FocusEvent,
    FormEvent,
    ChangeEvent,
} from 'react'
import Checkbox from '@/components/atoms/Checkbox/Checkbox'
import TextArea from '@/components/atoms/TextArea/TextArea'
import styles from './BudgetItem.module.css'

const BudgetItem = () => {
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const amountRef = useRef<HTMLTextAreaElement>(null)
    const [amount, setAmount] = useState<string>()

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
    }

    const handleAmountFieldOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        const amountValue = e.target.value

        if (amountValue === '' || parseInt(amountValue) === 0) {
            setAmount('')
            return
        }

        const formattedNumber = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(parseInt(amountValue))
        setAmount(formattedNumber)
    }

    const handleCheckboxToggle = (e: ChangeEvent) => {
        const { checked } = e.target as HTMLInputElement
        console.log({ checked })
    }

    return (
        <div className="relative">
            <Checkbox
                className={styles.checkbox}
                onChange={handleCheckboxToggle}
            />
            <div className="flex w-full">
                <TextArea
                    ref={descriptionRef}
                    placeholder=""
                    className={styles.descriptionField}
                    onChange={() => handleChange(descriptionRef)}
                />
                <TextArea
                    ref={amountRef}
                    placeholder=""
                    className={styles.amountField}
                    onChange={() => handleChange(amountRef)}
                    onBlur={handleAmountFieldOnBlur}
                    onFocus={handleAmountFieldFocus}
                    onInput={handleAmountInput}
                    value={amount}
                />
            </div>
        </div>
    )
}

export default BudgetItem
