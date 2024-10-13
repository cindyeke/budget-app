import clsx from 'clsx'
import { Path, UseFormRegister, FieldValues } from 'react-hook-form'
import styles from './TextField.module.css'

interface TextFieldProps {
    placeholder: string
    type: 'text' | 'number'
    register: UseFormRegister<FieldValues>
    name: Path<FieldValues>
    className?: string
    required?: boolean
    requiredMessage?: string
    pattern?: RegExp
    patternMessage?: string
}

const TextField = ({
    placeholder,
    type,
    name,
    register,
    className,
    required = false,
    requiredMessage,
    pattern,
    patternMessage,
}: TextFieldProps) => {
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
            })}
            autoComplete="off"
        />
    )
}

export default TextField
