import clsx from 'clsx'
import { FieldValues, useFormContext } from 'react-hook-form'
import TextArea from '@/components/atoms/TextArea/TextArea'
import TextField from '@/components/atoms/TextField/TextField'
import InfoCircle from '@/svgs/info-circle.svg'

const textFieldStyle = 'mt-4'

export const StepOne = () => {
    const formMethods = useFormContext<FieldValues>()
    return (
        <TextField
            type="number"
            placeholder="Expected income"
            className={textFieldStyle}
            name="income"
            register={formMethods.register}
        />
    )
}

export const StepTwo = () => {
    const formMethods = useFormContext<FieldValues>()
    return (
        <TextField
            type="text"
            placeholder="Budget name"
            className={textFieldStyle}
            register={formMethods.register}
            name="title"
        />
    )
}

export const StepThree = () => {
    return (
        <>
            <TextArea
                placeholder="Budget description"
                className={clsx(textFieldStyle, 'h-[150px]')}
            />
            <div className="flex items-start gap-x-2 mt-2">
                <div>
                    <InfoCircle className="w-5 h-5" />
                </div>
                <div className="text-sm">
                    <span className="mr-1">
                        Feel free to skip this part if describing things isn't
                        your cup of tea
                    </span>
                    {String.fromCodePoint(parseInt('0x1f605', 16))}
                    {/* This piece of information will be shown for for logged in users */}
                    {/* . Remember, you can edit the budget description at any time
                    in the future. */}
                </div>
            </div>
        </>
    )
}
