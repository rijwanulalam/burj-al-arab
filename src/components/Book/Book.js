import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from "../Bookings/Bookings";


const Book = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { bedType } = useParams();
  const [myBook, setMyBook]= useState(false);
  const [selectedDate, setSelectedDate] = useState({
      checkIn: new Date(),
      checkOut: new Date()
  });

  const handleCheckInDate = (date) => {
    const newDates = {...selectedDate};
    newDates.checkIn = date;
    setSelectedDate(newDates);
  };
  const handleCheckOutDate = (date) => {
    const newDates = {...selectedDate};
    newDates.checkOut = date;
    setSelectedDate(newDates);
  };
  const handleButton = () => {
    const newBooking = {...loggedInUser, ...selectedDate}
    fetch('http://localhost:5000/addBooking', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newBooking)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

  }
  const handleMyBook = () => {
    setMyBook(true);
  }
  return (
    <div style={{ textAlign: "center" }}>
      {myBook ? <Bookings></Bookings> : <div>
        <h1>
        Hello {loggedInUser.name} Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={selectedDate.checkIn}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={handleButton} variant="contained" color="primary">
        Book Now
        </Button>
      </MuiPickersUtilsProvider>
      <br/><br/>
      <Button onClick={handleMyBook} variant="contained" color="primary">
        See Your Bookings
        </Button>
        <br/> <br/>
          </div>}
    </div>
  );
};

export default Book;
