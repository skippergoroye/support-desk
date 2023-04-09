import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as noteReset } from '../features/notes/noteSlice';




const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}
  
Modal.setAppElement('#root')



const Ticket = () => {
    const { modalIsOpen, setModalIsOpen} = useState(false)
    const { noteText, setNoteText} = useState('')

    const { ticket, isLoading, isError, message } = useSelector((state) => state.ticket)
    const { notes, isLoading: noteIsLoading } = useSelector((state) => state.note)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getSingleTicket(params.id))
        dispatch(getNotes(params.id))
    }, [isError, message, params.id, dispatch])

    

    // close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(params.id))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }


    if(isLoading || noteIsLoading){
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
                <h2>notes</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button className='btn'>Add note</button>
            )}

            {notes.map((note) => (
                <NoteItem  key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket