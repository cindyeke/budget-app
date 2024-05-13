import Modal from '../Modal/Modal'

interface UpdateCurrencyModalProps {
    hasDefaultCurrency: boolean
}

const UpdateCurrencyModal = ({
    hasDefaultCurrency,
}: UpdateCurrencyModalProps) => {
    const handleCloseModal = () => {

    }
    
    return (
        <>
            {hasDefaultCurrency && (
                <Modal handleClose={handleCloseModal}>hi</Modal>
            )}
        </>
    )
}

export default UpdateCurrencyModal
