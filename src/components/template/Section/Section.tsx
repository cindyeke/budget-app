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
        <section
            className={clsx(
                'w-dvw h-dvh md:h-lvh p-5 flex flex-col justify-between',
                background,
                className
            )}
        >
            {children}
        </section>
    )
}

export default Section
