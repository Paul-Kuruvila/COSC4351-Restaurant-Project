import './Home.css';
import React from 'react';

const Home = () => {
  const redirectHandler = (ref) => {
    window.location.href=`${ref}`;
  }
  
  return (
    <div className='Home'>
      <button className='ReserveButton' onClick ={() => redirectHandler('/reserve')}>RESERVE SEATING HERE!</button>
    </div>
  );
}

export default Home;