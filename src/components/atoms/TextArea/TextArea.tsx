import React, { forwardRef, ForwardedRef, FocusEvent, FormEvent } from 'react'
import clsx from 'clsx'
import styles from './TextArea.module.css'

interface TextAreaProps {
    placeholder?: string
    className?: string
    onChange?: () => void
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
    onInput?: (e: FormEvent<HTMLTextAreaElement>) => void
    value?: string
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
            />
        )
    }
)

export default TextArea
