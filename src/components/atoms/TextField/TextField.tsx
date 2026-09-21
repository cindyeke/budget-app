import clsx from 'clsx'
import { Path, UseFormRegister, FieldValues } from 'react-hook-form'
import styles from './TextField.module.css'

interface TextFieldProps<T extends FieldValues = FieldValues> {
    placeholder: string
    type: 'text' | 'number'
    register: UseFormRegister<T>
    name: Path<T>
    className?: string
    required?: boolean
    requiredMessage?: string
    pattern?: RegExp
    patternMessage?: string
    maxLength?: number
}

const TextField = <T extends FieldValues = FieldValues>({
    placeholder,
    type,
    name,
    register,
    className,
    required = false,
    requiredMessage,
    pattern,
    patternMessage,
    maxLength,
}: TextFieldProps<T>) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={clsx(className, styles.textInput)}
            {...register(name, {
                required: {
                    value: required,
                    message: requiredMessage || '',
                },
                pattern: pattern && {
                    value: pattern,
                    message: patternMessage || '',
                },
                maxLength: maxLength && {
                    value: maxLength,
                    message: `this field cannot be more than ${maxLength} characters`,
                },
            })}
            autoComplete="off"
        />
    )
}

export default TextField
