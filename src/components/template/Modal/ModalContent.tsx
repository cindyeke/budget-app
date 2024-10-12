import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalContentProps {
    children: ReactNode
    className?: string
}

const ModalContent = ({ children, className }: ModalContentProps) => {
    return <div className={clsx(className, styles.content)}>{children}</div>
}

export default ModalContent
