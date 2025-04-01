import clsx from 'clsx'
import { ReactNode } from 'react'

const Section = ({
    children,
    background = '',
    className = '',
}: {
    children: ReactNode
    background?: string
    className?: string
}) => {
    return (
        <section className={clsx('h-screen w-screen', background, className)}>
            {children}
        </section>
    )
}

export default Section
