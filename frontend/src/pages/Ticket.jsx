import React from 'react'
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTicket, reset, closeTicket } from '../features/tickets/ticketSlice';



const Ticket = () => {
    const { ticket, isLoading, isError, message } = useSelector((state) => state.ticket)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getSingleTicket(params.id))
    }, [isError, message, params.id, dispatch])

    

    // close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(params.id))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }


    if(isLoading){
        return <Spinner />
    }


    if(isError){
        return  <h3>Something Went Wrong</h3>
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url="/tickets" />
                <h2>
                    TicketID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>DateSubmitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Descritption of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket