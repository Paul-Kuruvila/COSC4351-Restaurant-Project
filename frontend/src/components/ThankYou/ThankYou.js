import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className='Login'>
      <div style={{height: '5rem'}}></div>
      <ul className='information-boxes'>
        <li className='container-title'>
          We've booked your reservation!
        </li>
        <p className='container-title2'>
          Thank you for using Seat Yourself!
        </p>
        <p className='container-description'>
          Click <a href='reserveinfo'>here</a> if you have an account and would like to view your reservation information, or click <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate('/')}>here</a> to return to our home page.
        </p>
      </ul>
    </div>
  )
}

export default ThankYou;