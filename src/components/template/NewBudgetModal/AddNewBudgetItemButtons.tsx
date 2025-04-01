import clsx from 'clsx'
import Button from '@/components/atoms/Button/Button'
import AddIcon from '@/svgs/add.svg'
import MinusIcon from '@/svgs/minus.svg'

const button = '!p-0 !gap-x-0 !border-0 !w-10 !h-10 !rounded-[50%]'
const icon = 'w-8 h-8 text-off-white'

const AddNewBudgetItemButtons = ({
    handleAddBtn,
    handleDeductBtn,
}: {
    handleAddBtn: () => void
    handleDeductBtn: () => void
}) => {
    return (
        <div className="flex flex-1 justify-between max-w-[96px]">
            <Button
                type="button"
                icon={<AddIcon className={icon} />}
                className={clsx(button, '!bg-lightteal')}
                onClick={handleAddBtn}
            />
            <Button
                type="button"
                icon={<MinusIcon className={icon} />}
                className={clsx(button, 'bg-red')}
                onClick={handleDeductBtn}
            />
        </div>
    )
}

export default AddNewBudgetItemButtons
