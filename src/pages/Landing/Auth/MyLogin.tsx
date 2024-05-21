import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/store'
import { useApi } from '../../../api/api'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'
import MyModal from '../../../components/MyModal'

type Props = {}

const MyLogin = () => {
  const store = useUserStore()
  const api = useApi(store.access)
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorShown, setErrorShown] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState<string>("");

  const loginHandler = async () => {
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

    try{
      const tokenPair = await api.doLogin(email, password)
      store.login(email, tokenPair.payload.token, tokenPair.payload.refresh)
      navigate("/orders")
    } catch (e){
      setErrorTitle("Ошибка входа")
      setErrorText(String(e))
      setErrorShown(true)
      return
    }
  }

  return (
    <div className='col-md-6 mx-auto h-100 d-flex flex-column  justify-content-center'>
        <MyModal icon={<ExclamationTriangleFill />} onHide={() => setErrorShown(false)} text={errorText} title={errorTitle} show={errorShown}/>
        <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Например: ivanov.ii@email.ru" required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Ваш пароль" required />
            </Form.Group>

            <div className='d-flex flex-wrap justify-content-between'>
                <Button variant="success" onClick={loginHandler}>
                    Войти
                </Button>
                <div className='fs-6 fw-light d-flex gap-2'>
                  <Link to="/reset" className='h-100 d-flex align-items-center text-muted'>
                    <span>Забыли пароль?</span>
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

export {MyLogin}