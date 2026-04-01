import { Dispatch, SetStateAction } from 'react'
import Section from '@/components/template/Section/Section'
import Button from '@/components/atoms/Button/Button'
import AddIcon from '@/svgs/add.svg'
import styles from './Banner.module.css'

const Banner = ({
    setOpenBudgetModal,
}: {
    setOpenBudgetModal: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <Section background={styles.background}>
            <Button
                type="button"
                label="create a budget"
                icon={<AddIcon className="w-5 h-5 text-teal" />}
                onClick={() => setOpenBudgetModal(true)}
                className="self-end text-teal border-teal"
            />
            <div className="flex flex-col text-off-white w-[250px] mb-20">
                <span className="text-[40px] leading-[45px]">
                    budgeting made easy
                </span>
                <span className="text-xs font-light mt-2 ml-1">
                    Create your budget in <b>three</b> steps: <br />
                    add your income, name your budget &<b> budget away!</b>
                </span>
            </div>
        </Section>
    )
}

export default Banner
