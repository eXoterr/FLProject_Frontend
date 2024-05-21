import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Order } from '../types/order'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck } from 'react-bootstrap-icons'

interface Props extends Order {
    className: string
}

const MyOrderCard = ({id, className, title, safe, tags, client, worker, budget, category, date, deadline}: Props) => {
  return (
    <div className={className}>
        <Card className='d-flex h-100' data-bs-toggle="tooltip">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <div className=''>
                    <span className='row  '>
                        <Card.Title className='col-8 d-flex flex-wrap'>{title}</Card.Title>
                        <div className='col-4 d-flex flex-column position-relative'>
                            <div className='position-relative'>
                                {
                                    safe &&
                                    <Link to="/safe-order">
                                        <Badge className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-1' bg='success'>
                                            <Check 
                                            height={15} width={15}
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="right"
                                            data-bs-title="Tooltip on right"
                                            />
                                        </Badge>
                                    </Link>
                                }
                                <Badge bg='secondary' className='fs-5 text-white w-100'>{budget} &#8381;</Badge>
                                <Link to="" className=''>
                                    <Badge bg='secondary' className='w-100 text-white text-ellipsis mt-1'>{category}</Badge>
                                </Link>
                            </div>
                        </div>
                    </span>
                    <div className='mt-2'>
                        <div className='mt-1 d-flex gap-2 overflow-hidden'>
                            {
                                tags.map(
                                    tag => <Link key={tag} to="">
                                        <Badge pill bg='light'>{tag}</Badge>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <Card.Text className='mt-3 fs-6 d-flex align-items-center gap-2'>
                        {new Date(date).toLocaleDateString("ru-RU")} <ArrowRight /> {new Date(deadline).toLocaleDateString("ru-RU")}
                    </Card.Text>
                    <Card.Text className='mt-3'>
                        {client}
                    </Card.Text>
                </div>
                
                <div className='mt-2'>
                    {
                        worker ?
                        <div className='d-flex flex-column'>
                            <Badge bg='success'>Исполнитель определен</Badge>
                        </div>
                        :
                        <Link to={"/order/"+id}>
                            <Button className='mt-3 position-relative w-auto' variant="success">
                                Подробнее
                            </Button>
                        </Link>
                    }
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default MyOrderCard