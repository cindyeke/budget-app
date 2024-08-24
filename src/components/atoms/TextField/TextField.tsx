import clsx from 'clsx'
import styles from './TextField.module.css'

interface TextFieldProps {
    placeholder: string
    type: 'text' | 'number'
    className?: string
}

const TextField = ({ placeholder, type, className }: TextFieldProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={clsx(className, styles.textInput)}
        />
    )
}

export default TextField
