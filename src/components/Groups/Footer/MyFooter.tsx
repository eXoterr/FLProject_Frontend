import React from 'react'

type Props = {
    sitename: string
}

const MyFooter = ({sitename}: Props) => {
  return (
    <footer className='bg-success-subtle pt-5 pb-5'>
        <span className='d-flex justify-content-center align-items-center'>
            {sitename} &copy; Все права защищены
        </span>
    </footer>
  )
}

export {MyFooter}