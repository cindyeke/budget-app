import clsx from 'clsx'
import Button from '@/components/atoms/Button/Button'
import AddIcon from '@/svgs/add.svg'
import MinusIcon from '@/svgs/minus.svg'
import EditIcon from '@/svgs/edit.svg'
import { Budget } from '@/utils/types'

const button =
    '!p-0 !gap-x-0 !border-0 !w-7 !h-7 md:!w-10 md:!h-10 !rounded-[50%]'
const icon = 'w-6 h-6 md:w-8 md:h-8 text-off-white'

const BudgetControlButton = ({
    selectedBudget,
    handleAddBtn,
    handleDeductBtn,
    handleEditBudgetTitle,
}: {
    selectedBudget: Budget | null
    handleAddBtn: () => void
    handleDeductBtn: () => void
    handleEditBudgetTitle: () => void
}) => {
    return (
        <div className="flex flex-1 justify-between max-w-24 md:max-w-36">
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
            {selectedBudget && (
                <Button
                    type="button"
                    icon={<EditIcon className={icon} />}
                    className={button}
                    onClick={handleEditBudgetTitle}
                />
            )}
        </div>
    )
}

export default BudgetControlButton
