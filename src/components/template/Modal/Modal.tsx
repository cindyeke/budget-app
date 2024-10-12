import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
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
        <>
            <div className="bg-teal/40 absolute w-full h-full top-0 left-0"></div>
            <div className={twMerge(styles.modal, modalClassName)}>
                <div className="h-[50px] text-grayblack self-end cursor-pointer">
                    <CloseSvg className="w-6 h-6" onClick={handleClose} />
                </div>
                <div
                    className={twMerge(
                        'flex flex-col flex-1',
                        groupedContentClassName
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal
