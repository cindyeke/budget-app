import clsx from 'clsx'
import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    useFormContext,
} from 'react-hook-form'
import TextArea from '@/components/atoms/TextArea/TextArea'
import TextField from '@/components/atoms/TextField/TextField'
import InfoCircle from '@/svgs/info-circle.svg'
import WarningIcon from '@/svgs/warning.svg'

const textFieldStyle = 'mt-4'
const errorMessageStyle =
    'mt-4 ml-2 text-sm text-red-500 font-bold flex gap-x-2 items-center'

const getErrorMessage = (error: any) => {
    return error?.message ? String(error.message) : ''
}

const getTextFieldStyle = (
    fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
) =>
    fieldError &&
    'focus:border-red focus:shadow-[0_0_5px_3px_rgba(214,116,109,0.5)]'

export const StepOne = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<FieldValues>()

    return (
        <>
            <TextField
                type="text"
                placeholder="Expected income"
                className={clsx(
                    textFieldStyle,
                    getTextFieldStyle(errors.income)
                )}
                name="income"
                register={register}
                required
                requiredMessage="expected income is required"
                pattern={/^\d+$/}
                patternMessage="this field must be a number"
            />
            {errors?.income && (
                <span className={errorMessageStyle}>
                    <WarningIcon className="w-5 h-5" />
                    {getErrorMessage(errors.income)}
                </span>
            )}
        </>
    )
}

export const StepTwo = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<FieldValues>()
    return (
        <>
            <TextField
                type="text"
                placeholder="Budget name"
                className={clsx(
                    textFieldStyle,
                    getTextFieldStyle(errors.title)
                )}
                register={register}
                name="title"
                required
                requiredMessage="budget name is required"
            />
            {errors?.title && (
                <span className={errorMessageStyle}>
                    <WarningIcon className="w-5 h-5" />
                    {getErrorMessage(errors.title)}
                </span>
            )}
        </>
    )
}

export const StepThree = () => {
    return (
        <>
            <TextArea
                placeholder="Budget description"
                className={clsx('mt-4', 'h-[150px]')}
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
