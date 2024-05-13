import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Modal.module.css'
import CloseSvg from '@/svgs/times.svg'

interface ModalProps {
    children: ReactNode
    handleClose: () => void
    modalClassName?: string
    groupedContentClassName?: string
}

const Modal = ({
    children,
    handleClose,
    modalClassName,
    groupedContentClassName,
}: ModalProps) => {
    return (
        <div className={clsx(modalClassName, styles.modal)}>
            <div className="h-[50px] text-grayblack self-end cursor-pointer">
                <CloseSvg className="w-6 h-6" onClick={handleClose} />
            </div>
            <div
                className={clsx(
                    groupedContentClassName,
                    'flex flex-col flex-1'
                )}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
