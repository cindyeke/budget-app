import clsx from 'clsx'
import styles from './Loader.module.css'

interface LoaderProps {
    className?: string
}

const Loader = ({ className }: LoaderProps) => {
    return <div className={clsx(className, styles.loader)}></div>
}

export default Loader
