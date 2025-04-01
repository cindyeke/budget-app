import { useEffect, useState } from 'react'

const Budgets = () => {
    // const [budgets, setBudgets] = useState<string>('')

    useEffect(() => {
        const storedBudgets = localStorage.getItem('budgets')
        // setBudgets(storedBudgets)
        console.log('budgets', JSON.parse(storedBudgets || '[]'))
    }, [])

    return (
        <div>
            <h1>Budgets</h1>
            {/* <p>{budgets}</p> */}
        </div>
    )
}

export default Budgets
