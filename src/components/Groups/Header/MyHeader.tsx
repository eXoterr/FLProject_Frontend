import React, { FC } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from 'zustand'
import { useUserStore } from '../../../store/store'

type Props = {
    sitename: string
    username?: string
}

const MyHeader: FC<Props> = ({sitename, username}: Props) => {
  const navigate = useNavigate()
  const store = useUserStore()
  const logout = () => {
    store.logout()
    navigate("/")
  }

  return (
    <Navbar expand="lg" className="bg-success-subtle">
      <Container>
        <Navbar.Brand href="#home" as={Link} to="/">{sitename}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex gap-2 w-100 justify-content-between">
            <div className='d-flex'>
              {
                // Если пользователь авторизован - показать ссылку "Заказы"
                username &&
                <Nav.Link href="#orders" as={Link} to="/orders">Заказы</Nav.Link>
              }
            </div>
            <div className='d-flex gap-2'>
              <Link to={username ? "/new-order" : "/login"}>
                  <Button variant='success'>Разместить заказ</Button>
              </Link>
              {
                // Если пользователь авторизован
                // Показать его email и кнопку для выхода из системы
                // Иначе вывести ссылки на вход и регистрацию
                username ?
                <span className='d-flex align-items-center'>
                    <span>{username}</span>
                    <Nav.Link onClick={logout}>
                      Выйти
                    </Nav.Link>
                </span>
                :
                <span className='d-flex'>
                  <Nav.Link href="#login" as={Link} to="/login">Вход</Nav.Link>
                  <Nav.Link href="#register" as={Link} to="/register">Регистрация</Nav.Link>
                </span>
              }  
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export {MyHeader}