import './Home.css';
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const backgroundColors = ['#FFB399', '#FFFF99','#E6B333', '#999966', '#99FF99',
'#E6B3B3', '#B366CC', '#80B300', '#1AB399', '#809900', '#66664D', '#CC80CC']; 

const Home = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const timeOut = useRef(null);
  
  function resetTimeout() {
    if(timeOut.current) {
      clearTimeout(timeOut);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeOut.current = setTimeout(
      () => setIndex((prevIndex) =>
        prevIndex === backgroundColors.length - 1 ? 0 : prevIndex + 1
      ), 2500
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='Home'>
      <div className='slideshow-container'>
        <div className='slider'
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {backgroundColors.map((backgroundColor, index) => (
            <div className='slide' key={index} style={{ backgroundColor: backgroundColor }}/>
          ))}
        </div>
      </div>
      <button data-testid="button" className='ReserveButton' onClick ={() => navigate('/reserve')}>RESERVE SEATING HERE!</button>
    </div>
  );
}

export default Home;