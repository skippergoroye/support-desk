import React from 'react'
import { Link } from 'react-router-dom'

const TicketItem = ({ item }) => {
  return (
    <div className='ticket'>
        <div>{new Date(item.createdAt).toLocaleString('en-US')}</div>
        <div>{item.product}</div>
        <div className = {`status status-${item.status}`}>{item.status}</div>
        <Link to={`/ticket/${item._id}`} className='btn btn-reverse btn-sm'>
            View
        </Link>
    </div>
  )
}

export default TicketItem