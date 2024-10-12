import clsx from 'clsx'
import { Path, UseFormRegister, FieldValues } from 'react-hook-form'
import { NewBudgetInputs } from '@/types/BudgetTypes'
import styles from './TextField.module.css'

interface TextFieldProps {
    placeholder: string
    type: 'text' | 'number'
    register: UseFormRegister<FieldValues>
    name: Path<FieldValues>
    className?: string
}

const TextField = ({
    placeholder,
    type,
    name,
    register,
    className,
}: TextFieldProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={clsx(className, styles.textInput)}
            {...register(name)}
        />
    )
}

export default TextField
