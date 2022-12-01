import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserve.css';

const Reserve = () => {
	const navigate = useNavigate();
	//number of guests and date n time 
	const [name, setName] = useState();
	const [datetime, setDateTime] = useState();
	const [hightraffic, setHighTraffic] = useState(false);
	const [credit, setCredit] = useState();
	const [phoneNum, setPhoneNum] = useState();
	const [email, setEmail] = useState();
	const [guests, setGuests] = useState();
	const [suggestRegister, setSuggestRegister] = useState(false);

	const profileData = async () => { //retrieving profile data from backend which is retrieved from database
		const response = await fetch('/profiledata')
		const jsonData = await response.json();
		return(jsonData)
	  }
	document.addEventListener("DOMContentLoaded", async () => { //set variables for visual rendering on page load
		let data = [];
		try {
			data = await profileData();
			setName(data.name);
			setDateTime(data.datetime);
			setPhoneNum(data.phoneNum);
			setEmail(data.email);
			setGuests(data.guests);
		} catch (e) {
			console.log("Error fetching profile data from backend");
			//console.log(e);
		}
		console.log(data);
	})

	useEffect(() => {
		const checkLoginStatus = async () => {
			const response = await fetch('/loginstatus');
			const jsonData = await response.json();
			console.log(jsonData);
			console.log(jsonData[1]);
			setSuggestRegister(!jsonData[1]);
		}

		console.log("User loaded the Reservation page... and we check if they are logged in. If they are not logged in, we will prompt them to register.");

		checkLoginStatus()
			.catch(console.error);
	}, [])

	

	//console.log(datetime);
	const specialDays = async(e) => {
		setDateTime(e.target.value);
		console.log(datetime);
		var date = datetime.slice(0,10);
		console.log(date);

		if (date.getDay() === 6 || date.getDay() === 0 || date.slice(5,11) == "06-04" || date.slice(5,11) == "12-25") {
			
		}
	}

	const handleSubmit = async (e) => { //sending data
		e.preventDefault();
		const guestData = {name, phoneNum, email, guests, datetime, credit};
		const options = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			//credentials: "include",
			body: JSON.stringify(guestData)
		};

		const response = await fetch('/reserve', options);
		const jsonData = await response.json();
		if (jsonData.reserved) { //if registration is successful
			console.log(jsonData);
			navigate('/register') //redirect to login page
		} else {
			console.log(jsonData);
		}
	}

	function requireNums(e){ // prevents characters from being typed
		if (e.key.length === 1 && isNaN(e.key) && !e.ctrlKey || e.key === '.' && e.target.value.toString().indexOf('.') > -1) {
				e.preventDefault();
				console.log('Please enter a number!');
		}
	}

	const ReserveAnyways = async () => {
		setSuggestRegister(false);
	}

	return (
		<div className='Reserve'>
			<div style={{height: '5rem'}}></div>
			<form onSubmit = {handleSubmit}>
				<ul className={suggestRegister ? 'hide' : 'information-boxes'}>
					<label className='container-title'>RESERVE A TABLE</label>
					<p className='container-description'>Before you can reserve a table, we're going to need some information:</p>
					<ul className='boxes-container'>
						<li className='guest-info'>
							<label className='Label'>Name:</label>
							<input className='inputbox' type='text' title='Please enter your name.' minLength="2" maxLength="50" required placeholder='Enter your name.'
							onChange = {(e) => setName(e.target.value)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Phone Number:</label>
							<input className='inputbox' type='text' title='Please enter your phone number.' minLength="10" maxLength="10" required placeholder='Enter your phone number.'
							onChange = {(e) => setPhoneNum(e.target.value)}
							onKeyPress = {(e) => requireNums(e)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Email:</label>
							<input className='inputbox' type='text' title='Please enter your email.' minLength="2" maxLength="100" required placeholder='Enter your email.'
							onChange = {(e) => setEmail(e.target.value)}
							/>
						</li>
						<li className='guest-info'>
							<label className='Label'>Number of Guests:</label>
							<input className='inputbox' type='text' title='Please enter the number of guests.' required placeholder='Enter the number of guests.'
							onChange = {(e) => setGuests(e.target.value)}
							onKeyPress = {(e) => requireNums(e)}
						/>
						</li>
							<form>
								<label className='Label'>Date and Time:</label>
								<input 
									type='datetime-local'
									id='DT'
									name=''
									min='2022-12-01T14:10'
									max='2023-12-01T14:10'
									onChange = {(e) => specialDays(e)} 
								/>
							</form>
					</ul>
					<li>
						<button className='Submit' type='submit'>Submit</button> 
					</li>
				</ul>
				<ul className={suggestRegister ? 'information-boxes' : 'hide'}>
					<label className='container-title2'>HEY, WE NOTICED YOU AREN'T LOGGED IN!</label>
					<p className='container-description'>You can login <a href='login'>here</a>, or if you don't have an account, you can register <a href='register'>here</a>.</p>
					<i className='container-option' onClick={() => ReserveAnyways()}>Proceed without registering</i>
				</ul>
			</form>
		</div>
	)
}

export default Reserve;