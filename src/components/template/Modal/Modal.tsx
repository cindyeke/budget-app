import { ReactNode, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './Modal.module.css'
import CloseSvg from '@/svgs/times.svg'

interface ModalProps {
    children: ReactNode
    handleClose: () => void
    modalClassName?: string
    groupedContentClassName?: string
    isOpen: boolean
}

const Modal = ({
    children,
    handleClose,
    modalClassName,
    groupedContentClassName,
    isOpen,
}: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isOpen && !dialog.open) {
            dialog.showModal()
            document.body.style.overflow = 'hidden'
        } else if (!isOpen && dialog.open) {
            dialog.close()
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose} // fires on Esc-close too, keeps state in sync
            onClick={(e) => {
                if (e.target === dialogRef.current) handleClose() // click on backdrop
            }}
        >
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
        </dialog>
    )
}

export default Modal
