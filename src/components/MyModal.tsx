import React, { FC, ReactNode } from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
    text: string
    title: string
    icon: ReactNode
    onHide: () => void
    show: boolean
}

const MyModal: FC<Props> = ({title, text, icon, onHide, show}: Props, ...props) => {
  return (
    <div>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        centered
        >
        <Modal.Header closeButton onClick={onHide}>
            <Modal.Title className='d-flex align-items-center gap-3' id="contained-modal-title-vcenter">
                {icon} Ошибка!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{title}</h4>
            <p>
                {text}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
    </div>
  )
}

export default MyModal