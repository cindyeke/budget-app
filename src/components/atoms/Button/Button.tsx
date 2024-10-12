import clsx from 'clsx'
import { ReactNode } from 'react'
import Loader from '@/components/atoms/Loader/Loader'
import { ButtonType } from '@/types/BudgetTypes'

interface ButtonProps {
    label?: string
    reverse?: boolean
    type: ButtonType
    icon?: ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
    rounded?: boolean
    isLoading?: boolean
}

const Button = ({
    label,
    reverse,
    type,
    icon,
    onClick,
    className,
    disabled,
    rounded,
    isLoading,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(
                className,
                { 'flex-row-reverse': reverse },
                { 'rounded-xl': rounded },
                { 'opacity-60 cursor-not-allowed': disabled },
                'flex items-center justify-center rounded-sm p-2 gap-x-2',
                'border-2 border-grayblack',
                'text-sm xs:text-base'
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading && <Loader />}
            <span>{label}</span>
            {icon && <span>{icon}</span>}
        </button>
    )
}

export default Button
