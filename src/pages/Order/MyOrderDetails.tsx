import React, { useState } from 'react'
import { Order } from '../../components/Parts/UI/types/order'
import { useLoaderData } from 'react-router'
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'

interface Props{
    
}

const MyOrderDetails = ({}: Props) => {
    const orderDetails: Order = useLoaderData() as Order
  return (
    <div className=''>
        <span className='row align-items-center mt-4'>
            <h1 className='col-lg-10 col-md-8 col-sm-12'>{orderDetails?.title}</h1>
            <div className='col-lg-2 col-md-4 col-sm-12'>
                <Badge bg='secondary' className='fs-3 text-white w-100'>{orderDetails.budget} &#8381;</Badge>
                <Link to="" className=''>
                    <Badge bg='secondary' className='w-100 text-white text-ellipsis fs-6 mt-1'>{orderDetails.category}</Badge>
                </Link>
            </div>
        </span>
        <div className='fs-4 mt-4 d-flex align-items-center gap-2'>
            {orderDetails.client}
            <Badge bg='success'>
                {10}
            </Badge>
            <Badge bg='danger'>
                {0}
            </Badge>
        </div>
        <div className='d-flex mt-4 gap-2'>
        {
            orderDetails.tags.map(
                tag => <Link key={tag} to="">
                    <Badge pill bg='light'>{tag}</Badge>
                </Link>
            )
        }
        </div>
        <div className='mt-4 col-lg-7 col-md-10 col-sm-12 text-justify'>
            {orderDetails.description}
        </div>
    </div>
  )
}

export default MyOrderDetails