import React, {
    forwardRef,
    ForwardedRef,
    FocusEvent,
    FormEvent,
    ChangeEvent,
} from 'react'
import clsx from 'clsx'
import styles from './TextArea.module.css'

interface TextAreaProps {
    placeholder?: string
    className?: string
    onChange?: (e?: ChangeEvent) => void
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
    onInput?: (e: FormEvent<HTMLTextAreaElement>) => void
    value?: string
    disabled?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            placeholder,
            className,
            onChange,
            onBlur,
            value,
            onInput,
            onFocus,
            disabled = false,
        }: TextAreaProps,
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        return (
            <textarea
                ref={ref}
                placeholder={placeholder}
                className={clsx(className, styles.textArea)}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onInput={onInput}
                value={value}
                disabled={disabled}
            />
        )
    }
)

export default TextArea
