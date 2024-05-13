import clsx from 'clsx'
import styles from './TextArea.module.css'

interface TextAreaProps {
    placeholder: string
    className?: string
}

const TextArea = ({ placeholder, className }: TextAreaProps) => {
    return (
        <textarea
            placeholder={placeholder}
            className={clsx(className, styles.textArea)}
        ></textarea>
    )
}

export default TextArea
