import React, { useState } from 'react';

const ReserveInfo = () => {
  const [name, setName] = useState('Guest');
  const [reserveTime, setReserveTime] = useState('joe');
  const [reserveName, setReserveName] = useState('joe');
  const [numGuests, setNumGuests] = useState(0);

  return (
    <div className='Login'>
      <div style={{height: '5rem'}}></div>
      <ul className='information-boxes'>
        <li className='container-title'>
          Welcome back {name}!
        </li>
        <li className='container-title2'>
          <u>Reservation Information</u>
        </li>
        <ul className='boxes-container'>
          <li className='guest-info'>
            <label className='Label'>Reservation Under:</label>
            <input disabled='true' placeholder={reserveName}
              onChange={(e)=> setReserveName(reserveName)}
            />
          </li>
          <li className='guest-info'>
            <label className='Label'>Reservation Time:</label>
            <input disabled='true' placeholder={reserveTime}
              onChange={(e)=> setReserveTime(reserveTime)}
            />
          </li>
          <li className='guest-info'>
            <label className='Label'>Number of Guests:</label>
            <input disabled='true' placeholder={numGuests}
              onChange={(e)=> setNumGuests(numGuests)}
            />
          </li>
        </ul>
        <li>
          <button data-testid="Submit"  className="Submit" style={{backgroundColor: 'red', width: '10rem', height: '4rem'}} type="button" onClick={(e) => console.log('Reservation will now be cancelled. Beep bop.')}>Cancel Reservation</button> 
        </li>
      </ul>
    </div>
  )
}

export default ReserveInfo;