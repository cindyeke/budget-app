import { useEffect, useState } from 'react'

const Budgets = () => {
    const [budgets, setBudgets] = useState<{ id: string; title: string }[]>([])

    const openBudgetList = () => {}

    useEffect(() => {
        const storedBudgets = localStorage.getItem('budgets')
        if (storedBudgets) {
            const budg = JSON.parse(storedBudgets)
            setBudgets(budg)
        }
        // // setBudgets(storedBudgets)
        // console.log('budgets', JSON.parse(storedBudgets || '[]'))
    }, [])

    return (
        <div>
            <h1>Budgets</h1>
            <div className="flex flex-col gap-y-5">
                {budgets.map(({ id, title }) => (
                    <button type="button" key={id} onClick={openBudgetList} className='text-left'>
                        {title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Budgets
