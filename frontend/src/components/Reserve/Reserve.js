import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserve.css';

const Reserve = () => {
	//number of guests and date n time 
	const [name, setName] = useState();
	const [phoneNum, setPhoneNum] = useState();
	const [email, setEmail] = useState();
	const [guests, setGuests] = useState();

	const navigate = useNavigate();

	const handleSubmit = async (e) => { //sending data
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			//credentials: "include",
			//body: JSON.stringify(loginData)
		};

		const response = await fetch('/auth', options);
	}

	return (
		<div className='Reserve'>
			<div style={{height: '5rem'}}></div>
			<form onSubmit = {handleSubmit}>
				<ul className='information-boxes'>
					<label className='container-title'>RESERVE A TABLE</label>
					<text className='container-description'>Before you can reserve a table, we're going to need some information:</text>
					<ul className='boxes-container'>
						<li className='guest-info'>
							<label className='Label'>Name:</label>
							<input className='inputbox' type='text' title='Please enter your name.' required placeholder='Enter your name.'
							onChange = {(e) => setName(e.target.value)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Phone Number:</label>
							<input className='inputbox' type='text' title='Please enter your phone number.' required placeholder='Enter your phone number.'
							onChange = {(e) => setPhoneNum(e.target.value)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Email:</label>
							<input className='inputbox' type='text' title='Please enter your email.' required placeholder='Enter your email.'
							onChange = {(e) => setEmail(e.target.value)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Number of Guests:</label>
							<input className='inputbox' type='text' title='Please enter the number of guests.' required placeholder='Enter the number of guests.'
							onChange = {(e) => setGuests(e.target.value)}
						/>
						</li>
							<form>
								<label className='Label'>Date and Time:</label>
								<input type='datetime-local' id='DT' name=''></input>
							</form>
					</ul>
					<li>
						<button className='Submit' type='submit'>Submit</button> 
					</li>
				</ul>
			</form>
		</div>
	)
}

export default Reserve;