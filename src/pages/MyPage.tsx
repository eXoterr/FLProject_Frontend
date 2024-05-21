import React, { FC, ReactNode } from 'react'
import { MyHeader } from '../components/Groups/Header/MyHeader'
import { MyFooter } from '../components/Groups/Footer/MyFooter'
import { Container } from 'react-bootstrap'
import { useUserStore } from '../store/store'

type Props = {
    children: ReactNode
    bgClass?: string
}

const SITENAME = "FLPlatform"

const MyPage: FC<Props> = ({children, bgClass}: Props) => {
    const store = useUserStore()

    return (
        <div className={`d-flex flex-column flex-grow-1 ${bgClass}`}>
            <MyHeader username={store.username} sitename={SITENAME} />
            <Container className={`d-block flex-grow-1 `}>
                {children}
            </Container>
            <MyFooter sitename={SITENAME} />
        </div>
    )
} 

export {MyPage}