import React from 'react'
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {}

const MyNewOrder = () => {
    const categories = [
        "Образование",
        "Разработка",
        "Дизайн",
        "Системное администрирование",
        "Нейросети",
        "Прочее"
    ]

  return (
    <div className='col-md-8 mx-auto h-100 d-flex flex-column  justify-content-center'>
        <h1 className='mt-4'>Размещение новго заказа</h1>
        <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control type="text" placeholder="Например: Разработка лендинг сайта для продажи" required />
                <Form.Text className="text-muted">
                    Вкратце опишите суть задачи
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Например: Необходимо разработать лендинг для компании, занимающейся продажей изделий из..." required />
                <Form.Text className="text-muted">
                    Подробное описание задачи. Сроки требования к исполнителю и т.д.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Бюджет</Form.Label>
                <Form.Control type='number' placeholder="Например: 200" min={100} required />
                <Form.Text className="text-muted">
                    Ваш максимальный бюджет на выполнение задачи
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Срок сдачи (дедлайн)</Form.Label>
                <Form.Control type='date'  required />
                <Form.Text className="text-muted">
                    Крайний срок сдачи результатов исполнителем
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Категория</Form.Label>
                <Form.Select
                >
                    <option>Выбрать...</option>
                    {
                        categories &&
                        categories.map(
                            cat => <option>{cat}</option>
                        )
                    }
                </Form.Select>
                <Form.Text className="text-muted">
                    Выберите подходящую категорию, чтобы исполнителям было проще найти Ваш заказ
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Ключевые слова</Form.Label>
                <Form.Control type='text' placeholder="Например: Сайт, Лендинг..." required />
                <Form.Text className="text-muted">
                    Укажите ключевые слова относящиеся к Вашему заказу
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <div className='d-flex gap-2'>
                    <Form.Check type="checkbox" id='safe' />
                    <label htmlFor="safe">Безопасная сделка</label>
                </div>
                <Form.Text className="text-muted">
                    Увеличивает заинтересованность исполнителей, повышает комиссию платформы
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <div className='d-flex gap-2'>
                    <Form.Check type="checkbox" id='hot' />
                    <label htmlFor="hot">Срочно</label>
                </div>
                <Form.Text className="text-muted">
                   Увеличивает приоритет заказа в общем списке, повышает комиссию платформы
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <div className='d-flex gap-2'>
                    <Form.Check type="checkbox" id='verified-only' />
                    <label htmlFor="verified-only">Только подтвержденные исполнители</label>
                </div>
                <Form.Text className="text-muted">
                   Показывать отклики только от исполнителей, подтвердивших свои персональные данные
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <div className='d-flex gap-2 mt-2'>
                    <Form.Check type="checkbox" id='tos' defaultChecked required />
                    <label htmlFor="tos">Согласен с <Link to="/tos"> условиями размещения заказов</Link></label>
                </div>
                <div className='d-flex gap-2 mt-2'>
                    <Form.Check type="checkbox" id='privacy' defaultChecked required />
                    <label htmlFor="privacy">Согласен с <Link to="/privacy">политикой обработки персональных данных</Link></label>
                </div>
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Button variant="success" type="submit">
                    Разместить заказ
                </Button>
            </div>
        </Form>
    </div>
  )
}

export default MyNewOrder