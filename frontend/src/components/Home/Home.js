import './Home.css';
import React from 'react';

const Home = () => {
  const redirectHandler = (ref) => {
    window.location.href=`${ref}`;
  }
  return (
    <div className='Home'>
      <div className = 'ReserveBut'>
        <button onClick ={() => redirectHandler('/reserve')}> RESERVE SEATING HERE! </button>
      </div>
    </div>
  );
}

export default Home;