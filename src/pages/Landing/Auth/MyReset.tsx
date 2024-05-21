import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {}

const MyReset = () => {
  return (
    <div className='col-md-6 mx-auto h-100 d-flex flex-column  justify-content-center'>
        <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Например: ivanov.ii@email.ru" required />
            </Form.Group>

            <div className='d-flex flex-wrap justify-content-between'>
                <Button variant="success" type="submit">
                    Сбросить пароль
                </Button>
                <div className='fs-6 fw-light d-flex gap-2'>
                  <Link to="/login" className='h-100 d-flex align-items-center text-muted'>
                    <span>Войти</span>
                  </Link>
                  <Link to="/register" className='h-100 d-flex align-items-center text-muted'>
                      <span>Зарегистрироваться</span>
                  </Link>
                </div>
            </div>
            
        </Form>
    </div>
  )
}

export {MyReset}