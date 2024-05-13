import clsx from 'clsx'
import styles from './Loader.module.css'

interface LoaderProps {
    className?: string
    color?: string
    width?: number
    size?: number
}

const Loader = ({
    className,
    color = 'white',
    width = 10,
    size = 50,
}: LoaderProps) => {
    const borderWidth = `border-[${width}px]`
    const borderTopColor = `border-t-${color}`
    const borderTopWidth = `border-t-[${width}px]`
    const loaderWidth = `w-[${size}px]`
    const loaderHeight = `h-[${size}px]`

    return (
        <div
            className={clsx(
                className,
                styles.loader,
                borderWidth,
                borderTopColor,
                borderTopWidth,
                loaderWidth,
                loaderHeight
            )}
        ></div>
    )
}

export default Loader
