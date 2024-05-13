import clsx from 'clsx'
import { ReactNode } from 'react'

interface H1Props {
    children: ReactNode
    className?: string
}

const H1 = ({ children, className }: H1Props) => {
    return (
        <h1 className={clsx(className, 'text-2xl xs:text-4xl mb-2')}>
            {children}
        </h1>
    )
}

export default H1
