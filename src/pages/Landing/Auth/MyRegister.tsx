import React, { FormEvent, MouseEventHandler, useState } from 'react'
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../../api/api'
import { useUserStore } from '../../../store/store'
import MyModal from '../../../components/MyModal'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'

type Props = {}

const MyRegister = () => {
    const [role, setRole] = useState<string>("client");
    const store = useUserStore()
    const api = useApi(store.access)
    const navigate = useNavigate()

    const [name, setName] = useState<string>("");
    const [surname, setSurame] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [errorShown, setErrorShown] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [errorTitle, setErrorTitle] = useState<string>("");

    const registerHandler = async () => {
        if (name?.length === 0){
            setErrorTitle("Поле Имя не может быть пустым!")
            setErrorText("Проверьте корректность введенных данных и повторите попытку")
            setErrorShown(true)
            return
        }

        if (surname?.length === 0){
            setErrorTitle("Поле Фамилия не может быть пустым!")
            setErrorText("Проверьте корректность введенных данных и повторите попытку")
            setErrorShown(true)
            return
        }

        if (email?.length === 0){
            setErrorTitle("Поле Email не может быть пустым!")
            setErrorText("Проверьте корректность введенных данных и повторите попытку")
            setErrorShown(true)
            return
        }

        if (password?.length === 0){
            setErrorTitle("Поле Пароль не может быть пустым!")
            setErrorText("Проверьте корректность введенных данных и повторите попытку")
            setErrorShown(true)
            return
        }

        if (password !== password2){
            setErrorTitle("Введенные пароли не совпадают!")
            setErrorText("Проверьте корректность введенных данных и повторите попытку")
            setErrorShown(true)
            return
        }

        try{
            await api.doRegister(email, password, name, surname)
            const tokenPair = await api.doLogin(email, password)
            store.login(email, tokenPair.payload?.token, tokenPair.payload?.refresh)
            navigate("/orders")
        } catch(e){
            setErrorTitle("Ошибка регистрации")
            setErrorText(String(e))
            setErrorShown(true)
            return
        }
    }

  return (
    <div className='col-md-6 mx-auto h-100 d-flex flex-column  justify-content-center'>
        <MyModal icon={<ExclamationTriangleFill />} onHide={() => setErrorShown(false)} text={errorText} title={errorTitle} show={errorShown}/>
        <Form className='mt-4'>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Имя</Form.Label>
                <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Например: Иван" required />
                <Form.Text className="text-muted">
                    Ваше имя
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control value={surname} onChange={e => setSurame(e.target.value)} type="text" placeholder="Например: Иванов" required />
                <Form.Text className="text-muted">
                    Ваша фамилия
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Например: ivanov.ii@email.ru" required />
                <Form.Text className="text-muted">
                    На него будет отправлено письмо для подтверждения
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Ваш пароль" required />
                <Form.Text className="text-muted">
                    Минимум 8 символов
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control value={password2} onChange={e => setPassword2(e.target.value)} type="password" placeholder="Подтвердите пароль" required />
                <Form.Text className="text-muted">
                    Ещё раз, для избежания ошибок
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4 d-flex flex-column gap-2" controlId="formBasicCheckbox">
                <Form.Label>Кто вы?</Form.Label>
                <ToggleButtonGroup name='role'>
                    <ToggleButton
                        id="client"
                        type="radio"
                        variant="success"
                        name="role"
                        value="client"
                        checked={true}
                        onChange={(e) => setRole(e.currentTarget.value)}
                    >
                        Заказчик
                    </ToggleButton>
                    <ToggleButton
                        id="worker"
                        type="radio"
                        variant="success"
                        name="role"
                        value="worker"
                        onChange={(e) => setRole(e.currentTarget.value)}
                    >
                        Исполнитель
                    </ToggleButton>
                </ToggleButtonGroup>
            </Form.Group>

            <Form.Group className="mb-4 d-flex gap-2" controlId="formBasicCheckbox">
                <Form.Check defaultChecked type="checkbox" id='agreement' required />
                <label htmlFor="agreement">Согласен с условиями <Link to="/tos">пользовательского соглашения</Link></label>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
                <Button variant="success" onClick={registerHandler}>
                    Создать аккаунт
                </Button>
                <Link to="/login" className='h-100 d-flex align-items-center text-muted'>
                    <span>Уже есть аккаунт</span>
                </Link>
            </div>
        </Form>
    </div>
  )
}

export {MyRegister}