import clsx from 'clsx'
import Button from '@/components/atoms/Button/Button'
import styles from './Modal.module.css'

interface ModalControlButtonsProps {
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
                type="button"
                label={prevBtnLabel}
                onClick={handleGoBackToPrevStep}
                className={clsx(btnClassName, styles.controlButton, {
                    invisible: omitPrevBtn,
                })}
            />
            <Button
                type="button"
                label={nextBtnLabel}
                onClick={handleContinueStep}
                className={clsx(btnClassName, styles.controlButton)}
                isLoading={isLoading}
            />
        </div>
    )
}

export default ModalControlButtons
