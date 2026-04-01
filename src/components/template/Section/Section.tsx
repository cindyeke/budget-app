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
        <section className={clsx('h-dvh w-dvw', background, className)}>
            {children}
        </section>
    )
}

export default Section
