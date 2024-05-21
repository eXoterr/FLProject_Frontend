import React, { FC } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Worker } from '../types/worker'

interface Props extends Worker{
    className: string
}

const MyWorker: FC<Props> = ({name, description, tags, className, pro}: Props) => {
  return (
    <div className={className}>
        <Card className='d-flex h-100'>
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <div>
                    <Card.Title>{name}</Card.Title>
                    <div className='d-flex gap-2 overflow-hidden'>
                        {
                            pro &&
                            <Link to="">
                                <Badge pill bg='success'>PRO</Badge>
                            </Link>
                            
                        }
                        {
                            tags.map(
                                tag => <Link key={tag} to="">
                                    <Badge pill bg='light'>{tag}</Badge>
                                </Link>
                            )
                        }
                    </div>
                    <Card.Text className='mt-3'>
                        {description}
                    </Card.Text>
                </div>
                <div className='mt-3'>
                    
                    <Button className='mt-3' variant="success">Портфолио</Button>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default MyWorker