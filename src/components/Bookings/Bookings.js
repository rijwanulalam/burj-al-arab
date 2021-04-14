import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Bookings.css'

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [remainBook, setRemainBook] = useState(0);
    useEffect(() =>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data => {setBookings(data)
                        setRemainBook(data.length)
        })
    },[])
    const handleRemove = (id, event) => {
        const nodeParent = event.target.parentNode.parentNode;
        console.log(nodeParent)
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {

                nodeParent.style.display = 'none';
                const newBook = remainBook - 1;
                setRemainBook(newBook);
        })
    }
    return (
        <div>
            {
                remainBook === 0 ? <h3>You Have {bookings.length} Bookings Remaining.</h3> : <h3>You Have {remainBook} Bookings Remaining</h3>
            }
            {
                bookings.map(book => <div className="book-details">{book.name} from : {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} To : {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}
                <br/> <Button onClick={(event) => {handleRemove(book._id, event)}}  variant="contained" color="primary">
                remove
                </Button>
                </div>)
            }
        </div>
    );
};

export default Bookings;