import React, { useState } from 'react'
import styles from './MyIndex.module.scss'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MyWorker from '../../components/Parts/UI/MyWorker/MyWorker'
import { Worker } from '../../components/Parts/UI/types/worker'

type Props = {}

const MyIndex = () => {
    const [search, setSearch] = useState<string>("")

    const tags = [
        "Разработка",
        "WordPress",
        "Дизайн",
        "Лого"
    ]

    const topWorkers: Worker[] = [
        {
            id: 1,
            name: "Валерий",
            description: "Я Валера) Занимаюсь дизайном с 2007 года. Пишите, доворимся",
            tags: [
                "Дизайнер",
                "100+ Работ"
            ],
            pro: true
        },
        {
            id: 2,
            name: "Олег",
            description: "Опытный программист. Делаю сайты на заказ, недорого",
            tags: [
                "Разработчик",
                "Веб",
                "1С"
            ],
            pro: true
        },
        {
            id: 3,
            name: "Илон",
            description: "Я Илон Маск! Сделаю Вам лого через свою новую нейросеть!",
            tags: [
                "AI",
                "Нейросети",
                "Дизайнер"
            ],
            pro: true
        },
        {
            id: 4,
            name: "Михаил",
            description: "Начинающий дизайнер. Могу сделать превью за отзыв ;)",
            tags: [
                "Дизайнер",
                "Новенький",
                "YouTube",
            ],
            pro: false
        },
        
    ]

  return (
    <>
        <div className={styles.hero+' d-flex justify-content-center flex-column gap-3 col-md-6'}>
            <h1 className='fw-bold'>Фриланс-биржа <br/>нового поколения</h1>
            <h3>Найдите исполнителя на любую задачу!</h3>
            <div>
                <InputGroup>
                    <Form.Control
                        type="text"
                        id="search"
                        placeholder="Я хочу..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button variant='success'>Исполнить!</Button>
                </InputGroup>
            </div>
            <div className='d-flex gap-3'>
                {
                    tags.map(
                        tag => {
                            return <Badge className='cursor-pointer' key={tag} pill bg='light' onClick={() => setSearch(search + " " + tag)}>{tag}</Badge>
                        }
                    )
                }
            </div>
        </div>
        <div>
            <h2 className='fw-bold'>Наши исполнители:</h2>
            <div className='mt-3 row row-cols-sm-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-5'>
                {
                    topWorkers.map(
                        worker => <MyWorker 
                            id={worker.id}
                            key={worker.id}
                            name={worker.name}
                            description={worker.description}
                            className="col"
                            tags={worker.tags}
                            pro={worker.pro}
                        />
                    )
                }
            </div>
        </div>
    </>
  )
}

export {MyIndex}