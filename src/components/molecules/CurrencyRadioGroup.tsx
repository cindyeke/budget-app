import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { CURRENCY } from '@/utils/types'

const currencies = [
    { value: CURRENCY.NGN, label: 'NGN (₦)' },
    { value: CURRENCY.XOF, label: 'XOF (CFA)' },
    { value: CURRENCY.EUR, label: 'EUR (€)' },
]

interface CurrencyRadioGroupProps<T extends FieldValues = FieldValues> {
    register: UseFormRegister<T>
    name?: Path<T>
    className?: string
}

const CurrencyRadioGroup = <T extends FieldValues = FieldValues>({
    register,
    name = 'currency' as Path<T>,
    className,
}: CurrencyRadioGroupProps<T>) => {
    return (
        <fieldset className={className}>
            <div className="flex gap-x-4">
                {currencies.map(({ value, label }) => (
                    <label
                        key={value}
                        className="flex items-center gap-x-2 cursor-pointer text-base"
                    >
                        <input
                            type="radio"
                            value={value}
                            className="accent-turquoise"
                            {...register(name, { required: true })}
                        />
                        {label}
                    </label>
                ))}
            </div>
        </fieldset>
    )
}

export default CurrencyRadioGroup
