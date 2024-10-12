import clsx from 'clsx'
import Button from '@/components/atoms/Button/Button'
import styles from './Modal.module.css'
import { BUTTON, ButtonType } from '@/types/BudgetTypes'

interface ModalControlButtonsProps {
    prevBtnType?: ButtonType
    nextBtnType?: ButtonType
    step: number
    handleGoBackToPrevStep?: () => void
    handleContinueStep?: () => void
    prevBtnLabel?: string
    nextBtnLabel: string
    omitPrevBtn?: boolean
    className?: string
    btnClassName?: string
    isLoading: boolean
}

const ModalControlButtons = ({
    prevBtnType = BUTTON,
    nextBtnType = BUTTON,
    handleGoBackToPrevStep,
    handleContinueStep,
    omitPrevBtn = false,
    prevBtnLabel = 'Go Back',
    nextBtnLabel,
    className,
    btnClassName,
    isLoading,
}: ModalControlButtonsProps) => {
    return (
        <div className={clsx(className, 'flex justify-between mt-5')}>
            <Button
                type={prevBtnType}
                label={prevBtnLabel}
                onClick={handleGoBackToPrevStep}
                className={clsx(btnClassName, styles.controlButton, {
                    invisible: omitPrevBtn,
                })}
            />
            <Button
                type={nextBtnType}
                label={nextBtnLabel}
                onClick={handleContinueStep}
                className={clsx(btnClassName, styles.controlButton)}
                isLoading={isLoading}
            />
        </div>
    )
}

export default ModalControlButtons
