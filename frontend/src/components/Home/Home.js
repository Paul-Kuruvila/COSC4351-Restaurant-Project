import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='Home'>
      <button className='ReserveButton' onClick ={() => navigate('/reserve')}>RESERVE SEATING HERE!</button>
    </div>
  );
}

export default Home;