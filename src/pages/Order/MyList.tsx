import React, { useEffect, useState } from 'react'
import MyOrderCard from '../../components/Parts/UI/MyOrderCard/MyOrderCard'
import { Order } from '../../components/Parts/UI/types/order'
import { Button, Collapse, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { useUserStore } from '../../store/store'
import { useNavigate } from 'react-router'

type Props = {}

const MyList = () => {
    const store = useUserStore()
    const navigate = useNavigate()

    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("date");
    const [budgetMin, setBudgetMin] = useState<number>(0);
    const [budgetMax, setBudgetMax] = useState<number>(0);
    const [filterWorker, setFilterWorker] = useState<string>("");
    const [filterSafeOrder, setFilterSafeOrder] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<string>("desc");

    const compareDateStr = (date1Str: string, date2Str: string) => {
        const date1 = Date.parse(date1Str)
        const date2 = Date.parse(date2Str)
        if (date1 == date2) return 0
        const result = date1 > date2 ? 1 : -1
        return result
    }

    const sortAndFilter = () => {
        let filtered = filterByTitle(serverOrders)
        filtered = filterByBudget(filtered)
        filtered = filterByWorker(filtered)
        filtered = filterBySafeOrder(filtered)
        filtered = sortOrders(filtered)
        setOrders(filtered)
        
    }

    const filterByBudget = (orders: Order[]) => {
        if (budgetMin == 0 && budgetMax == 0){
            return orders
        }

        let filteredOrders = [...orders]
        if (budgetMin != 0 && budgetMax == 0){
            filteredOrders = filteredOrders.filter(
                order =>
                    {
                        return Number.parseInt(order.budget) >= budgetMin
                    }
            )
        } else if (budgetMin == 0 && budgetMax != 0){
            filteredOrders = filteredOrders.filter(
                order =>
                    {
                        return Number.parseInt(order.budget) <= budgetMax
                    }
            ) 
        } else {
            filteredOrders = filteredOrders.filter(
                order =>
                    {
                        return Number.parseInt(order.budget) >= budgetMin &&
                        Number.parseInt(order.budget) <= budgetMax
                    }
            )
   
        }
        return filteredOrders
    }

    const filterByWorker = (orders: Order[]) => {
        let filteredOrders = [...orders].filter(
            order => {
                switch (filterWorker){
                    case "yes":
                        return order.worker
                    case "no":
                        return !order.worker
                    default:
                        return true
                }
            }
        )
        return filteredOrders
    }

    const filterBySafeOrder = (orders: Order[]) => {
        let filteredOrders = [...orders].filter(
            order => {
                switch (filterSafeOrder){
                    case "yes":
                        return order.safe
                    case "no":
                        return !order.safe
                    default:
                        return true
                }
            }
        )
        return filteredOrders
    }

    const sortOrders = (orders: Order[]) => {
        let sortedOrders = [...orders]
            switch (sortBy) {
                case "date":
                    sortedOrders.sort(
                        (order1, order2) =>{
                            return sortDirection == "desc" 
                            ?  compareDateStr(order1.date, order2.date)
                            :  compareDateStr(order2.date, order1.date)
                        }
                    )
                    return sortedOrders
                case "deadline":
                    sortedOrders.sort(
                        (order1, order2) =>{
                            return sortDirection == "desc" 
                            ?  compareDateStr(order1.date, order2.date)
                            :  compareDateStr(order2.date, order1.date)
                        }
                    )
                    return sortedOrders
                case "budget":
                    sortedOrders.sort(
                        (order1, order2) =>{
                            return sortDirection == "desc" 
                            ?  Number.parseInt(order2.budget) - Number.parseInt(order1.budget)
                            :  Number.parseInt(order1.budget) - Number.parseInt(order2.budget)
                        }
                    )
                    return sortedOrders
                default:
                    return sortedOrders
            }
    }


    // Onload
    useEffect(
        () => {
            if (store.username.length === 0)
            {
                navigate("/login")
                return
            }
            setOrders([...serverOrders])
        },
        []
    )

    useEffect(
        () => {
            if (window.innerWidth >= 770){
                setShowFilters(true)
            }
        }
    )

    useEffect(
        () => {
            setOrders([...serverOrders])
            sortAndFilter()
        },
        [
            budgetMin,
            budgetMax,
            filterSafeOrder,
            filterWorker,
            sortBy,
            sortDirection,
            search,
        ]
    )

    const filterByTitle = (orders: Order[]) => {
        let filteredOrders = [...orders].filter(
            (order) => order.title.toLowerCase().includes(search.toLowerCase())
        )   
        return filteredOrders
    }

    const serverOrders = [
        {
            id: 1,
            budget: "3000",
            client: "Мария Ивановна",
            safe: true,
            tags: ["Школа", "Презентация", "PowerPoint"],
            title: "Презентация по истории для 9 класса",
            category: "Образование",
            date: "2024-05-15T01:33:29.567Z",
            deadline: "2024-05-21T01:33:29.567Z",
        },
        {
            id: 2,
            budget: "500",
            client: "Майнкрафт Крипер",
            safe: false,
            tags: ["Майнкрафт", "Сервер", "Выживание", "Донат"],
            title: "Создать майнкрафт сервер с донатом",
            date: "2024-05-19T01:33:29.567Z",
            deadline: "2024-09-01T01:33:29.567Z",
            category: "Системное администрирование",
        },
        {
            id: 3,
            budget: "1000",
            client: "Михаил Иванович",
            safe: true,
            tags: ["MSOffice", "Excel", "Бухгалтерия"],
            title: "Исправить данные в таблице Excel",
            date: "2024-05-21T01:33:29.567Z",
            deadline: "2024-05-31T01:33:29.567Z",
            category: "Прочее",
            worker: "1",
        },
        {
            id: 4,
            budget: "20000",
            client: "ООО СОФТСТРОЙКОД Лимитед",
            safe: true,
            tags: ["Сайт под ключ"],
            title: "Разработка информационного портала для сотрудников компании",
            date: "2024-05-15T01:33:29.567Z",
            deadline: "2024-07-01T01:33:29.567Z",
            category: "Разработка",
        },
        {
            id: 5,
            budget: "30000",
            client: "Влад Козыра",
            safe: true,
            tags: ["Дизайн", "Превью", "YouTube", "Photoshop"],
            title: "Превью для видео YouTube. Цена указана за 10 штук",
            date: "2024-05-15T01:33:29.567Z",
            deadline: "2024-05-21T01:33:29.567Z",
            category: "Дизайн",
        },
    ]

    const [orders, setOrders] = useState<Order[]>([...serverOrders]);

  return (
    <>
    <div className='d-flex flex-column mt-4'>
            <h2 className='fw-bold'>Поиск заказов:</h2>
            <div className='mt-4'>
                <InputGroup>
                    <Form.Control
                        type="text"
                        id="search"
                        placeholder="Я хочу..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant='success'>Найти!</Button>
                </InputGroup>
            </div>
            <Button
                    onClick={() => setShowFilters(!showFilters)}
                    aria-controls="example-collapse-text"
                    aria-expanded={showFilters}
                    variant='success'
                    className='mt-2 d-block d-lg-none'
                >
                Показать фильтры
            </Button>
        </div>
    <div className='d-flex flex-wrap justify-content-between mt-4'>
            <Collapse in={showFilters} dimension="height">
                <div className='col-md-3 col-12'>
                <div className='d-flex flex-column gap-2 overflow-hidden w-100 mb-4'>
                    <div>
                        <FloatingLabel  controlId="sortFilter" label="Отсортировать по">
                            <Form.Select
                                value={sortBy}
                                onChange={(e) => {return setSortBy(e.target.value)}}
                            >
                                <option value="date">Дате</option>
                                <option value="deadline">Срокам</option>
                                <option value="budget">Бюджету</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel  controlId="sortDirFilter" label="Порядок">
                            <Form.Select
                                value={sortDirection}
                                onChange={(e) => {return setSortDirection(e.target.value)}}
                            >   
                                <option value="desc">По убыванию</option>
                                <option value="asc">По возрастанию</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    <h6 className='mt-2'>Бюджет</h6>
                    <div className='d-flex gap-2'>
                        <FloatingLabel className='w-100' controlId="budgetFilter" label="От">
                            <Form.Control type="number" placeholder="От" 
                                value={budgetMin}
                                onChange={e => {
                                    if (!Number.parseInt(e.target.value)) e.target.value = "0"
                                    setBudgetMin(Number.parseInt(e.target.value));
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel className='w-100' controlId="budgetFilter" label="До">
                            <Form.Control type="number" placeholder="До"
                                value={budgetMax}
                                onChange={e => {
                                    if (!Number.parseInt(e.target.value)) e.target.value = "0"
                                    setBudgetMax(Number.parseInt(e.target.value));
                                }}
                            />
                        </FloatingLabel>
                    </div>
                    <h6 className='mt-2'>Прочее</h6>
                    <div className=''>
                        <FloatingLabel  controlId="budgetFilter" label="Безопасная сделка">
                            <Form.Select
                                value={filterSafeOrder}
                                onChange={(e) => setFilterSafeOrder(e.target.value)}
                            >
                                <option value="">Не важно</option>
                                <option value="yes">Да</option>
                                <option value="no">Нет</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    <div className=''>
                        <FloatingLabel  controlId="budgetFilter" label="Исполнить оперделен">
                            <Form.Select
                                value={filterWorker}
                                onChange={(e) => setFilterWorker(e.target.value)}
                            >
                                <option value="">Не важно</option>
                                <option value="yes">Да</option>
                                <option value="no">Нет</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                    <Button variant='success'>
                        Все фильтры
                    </Button>
                </div>
                </div>
            </Collapse>
            <div className='row row-cols-xl-2 row-cols-md-2 row-cols-sm-1 g-3 col-md-9 h-fit'>
                {
                    orders &&
                    orders.map(
                        order => 
                            <MyOrderCard
                                key={order.id}
                                className='col'
                                client={order.client}
                                id={order.id}
                                safe={order.safe}
                                tags={order.tags}
                                title={order.title}
                                budget={order.budget}
                                worker={order?.worker}
                                category={order.category}
                                date={order.date}
                                deadline={order.deadline}
                            />
                    )
                }
            </div>
        </div>        
    </>
  )
}

export default MyList