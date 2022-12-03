import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserve.css';

const Reserve = () => {
	const navigate = useNavigate();
	//number of guests and date n time 
	const [name, setName] = useState();
	const [datetime, setDateTime] = useState("test");
	const [hightraffic, setHighTraffic] = useState(false);
	const [cardInfo, setCardInfo] = useState({name: '', type: '', number: '', security: '', expirationMonth: '', expirationYear: ''});
	const [phoneNum, setPhoneNum] = useState();
	const [email, setEmail] = useState();
	const [guests, setGuests] = useState();
	const [suggestRegister, setSuggestRegister] = useState(false);
	const [alreadyReserved, setAlreadyReserved] = useState(false);

	const profileData = async () => { //retrieving profile data from backend which is retrieved from database
		const response = await fetch('/profiledata')
		const jsonData = await response.json();
		return(jsonData)
	}
	document.addEventListener("DOMContentLoaded", async () => { //set variables for visual rendering on page load
		let data = [];
		try {
			data = await profileData();
			console.log(data);
			setName(data.name);
			if(data.email !== "undefined")
				setEmail(data.email);
			if(data.phonenum !== "undefined")
				setPhoneNum(data.phonenum);
			//setCredit(credit);
			//setEmail(data.email);
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

	

	const specialDays = async(e) => {
		setDateTime(e.target.value);
		var date = e.target.value.slice(0,10);
		const finDate = new Date(date);

		if (finDate.getDay() === 6 || finDate.getDay() === 5 || date.slice(5,11) === "07-04" || date.slice(5,11) === "12-25") {
			setHighTraffic(true);
		} else {
			setHighTraffic(false);
		}
	}

	const handleSubmit = async (e) => { //sending data
		e.preventDefault();
		const guestData = {name, phoneNum, email, guests, datetime/*, credit*/};
		const options = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(guestData)
		};

		const response = await fetch('/reserve', options);
		const jsonData = await response.json();
		
		//The jsonData has a status that is returned to let us know if the reservation was successful or failed, and why it failed.
		if (jsonData.reserved && !jsonData.login) { //if reservation is successful and not logged in
			console.log(jsonData);
			navigate('/thankyou') //redirect to registration page and notify of successful registration
		} else if (jsonData.reserved) { //if reservation was successful and logged in
			console.log(jsonData);
			navigate('/thankyou') //redirect to successful reservation OR we can simply do the container box text that pops up
		} else { //If the reservation failed.
			if(jsonData.priorReservation) // if there is already a reservation under the number, priorReservation will be true, otherwise it will be undefined.
				setAlreadyReserved(true);
			console.log(jsonData) //i.e.: there is already a reservation under the number; Info failed to reserve. (FROM BACKEND)
		}
	}

	function requireChars(e) { // prevents numbers from being typed
		if((e.target.value[0] === ' ' || e.target.value[0] === undefined) && e.key === ' '){
				e.preventDefault();
		}

		if ((e.key.length === 1 && !isNaN(e.key) && !e.ctrlKey && e.key !== ' ') || e.key === '.') {
				e.preventDefault();
				console.log('Please enter a character that is not a number/special character!');
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
				<div className={alreadyReserved ? 'hide' : 'show'}>
					<ul className={suggestRegister ? 'hide' : 'information-boxes'}>
						<label className='container-title'>RESERVE A TABLE</label>
						<p className='container-description'>Before you can reserve a table, we're going to need some information:</p>
						<ul className='boxes-container'>
							<li className='guest-info'>
								<label className='Label'>Name:</label>
								<input className='inputbox' type='text' title='Please enter your name.' minLength="2" maxLength="50" required placeholder='Enter your name.'
								onChange = {(e) => setName(e.target.value)}
								onKeyPress = {(e) => requireChars(e)}
								value = {name}
								/>
							</li>
							<li className='guest-info'>
								<label className='Label'>Phone Number:</label>
								<input className='inputbox' type='text' title='Please enter your phone number.' minLength="10" maxLength="10" required placeholder='Enter your phone number.'
								onChange = {(e) => setPhoneNum(e.target.value)}
								onKeyPress = {(e) => requireNums(e)}
								value = {phoneNum}
								/>
							</li>
							<li className='guest-info'>
								<label className='Label'>Email:</label>
								<input className='inputbox' type='text' title='Please enter your email.' minLength="2" maxLength="100" required placeholder='Enter your email.'
								onChange = {(e) => setEmail(e.target.value)}
								value = {email}
								/>
							</li>
							<li className='guest-info'>
								<label className='Label'>Number of Guests:</label>
								<input className='inputbox' type='text' title='Please enter the number of guests.' required placeholder='Enter the number of guests.'
								onChange = {(e) => setGuests(e.target.value)}
								onKeyPress = {(e) => requireNums(e)}
								value = {guests}
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
							<button className={hightraffic ? 'hide' : 'Submit'} type='submit'>Submit</button> 
						</li>
						<li>
							<ul className={hightraffic ? "show" : "hide"}>
								<label className={hightraffic ? 'showInvalid' : 'hide'}>High traffic days require a valid credit card as you will be charged a <b>$10 FEE FOR NO SHOWS.</b><br />Please enter your credit card information.</label>
								<ul className='boxes-container'>
									<li className='guest-info'>
										<label className='Label'>Card Type:</label>
										<select className="inputbox" name="exp-month" defaultValue={""} value={cardInfo['type']} required
											disabled={!hightraffic}
											onChange = {(e) => setCardInfo({name: cardInfo['name'], type: e.target.value, number: cardInfo['number'], security: cardInfo['security'], expirationMonth: cardInfo['expirationMonth'], expirationYear: cardInfo['expirationYear']})}>
											<option value="">Select Credit Card Type</option>
											<option value="Visa">Visa</option>
											<option value="MasterCard">MasterCard</option>
											<option value="AmericanExpress">AmericanExpress</option>
											<option value="Discover">Discover</option>
											<option value="JCB">JCB</option>
										</select>
									</li>
									<li className='guest-info'>
										<label className='Label'>Name on Card:</label>
										<input className='inputbox' type='text' title='Please enter the name on the card exactly as it appears.' required placeholder='Enter name on card.'
											disabled={!hightraffic}
											onKeyPress = {(e) => requireChars(e)}
											onChange = {(e) => setCardInfo({name: e.target.value, type: cardInfo['type'], number: cardInfo['number'], security: cardInfo['security'], expirationMonth: cardInfo['expirationMonth'], expirationYear: cardInfo['expirationYear']})}
											value = {cardInfo['name']}
										/>
									</li>
									<li className='guest-info'>
										<label className='Label'>Card Number:</label>
										<input className='inputbox' type='text' title='Please enter your credit card number.' required placeholder='Enter card number.'
											disabled={!hightraffic}
											minLength='16'
											maxlength='16'
											onChange = {(e) => setCardInfo({name: cardInfo['name'], type: cardInfo['type'], number: e.target.value, security: cardInfo['security'], expirationMonth: cardInfo['expirationMonth'], expirationYear: cardInfo['expirationYear']})}
											onKeyPress = {(e) => requireNums(e)}
											value = {cardInfo['number']}
										/>
									</li>
									<li className='guest-info'>
										<label className='Label'>Security Code:</label>
										<input className='inputbox' type='text' title='Please enter your credit card security code.' required placeholder='Enter security code.'
											disabled={!hightraffic}
											minLength='3'
											maxLength='3'
											onChange = {(e) => setCardInfo({name: cardInfo['name'], type: cardInfo['type'], number: cardInfo['number'], security: e.target.value, expirationMonth: cardInfo['expirationMonth'], expirationYear: cardInfo['expirationYear']})}
											onKeyPress = {(e) => requireNums(e)}
											value = {cardInfo['security']}
										/>
									</li>
									<li className='guest-info'>
										<label className='Label'>Expiration Date:</label>
										<select className="inputbox" name="exp-month" defaultValue={""} value={cardInfo['expirationMonth']} required
											disabled={!hightraffic}
											onChange = {(e) => setCardInfo({name: cardInfo['name'], type: cardInfo['type'], number: cardInfo['number'], security: cardInfo['security'], expirationMonth: e.target.value, expirationYear: cardInfo['expirationYear']})}>
											<option value="">Month</option>
											<option value="01">01</option>
											<option value="02">02</option>
											<option value="03">03</option>
											<option value="04">04</option>
											<option value="05">05</option>
											<option value="06">06</option>
											<option value="07">07</option>
											<option value="08">08</option>
											<option value="09">09</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
										</select>
										<select className="inputbox" name="exp-day" defaultValue={""} value={cardInfo['expirationYear']} required
											disabled={!hightraffic}
											onChange = {(e) => setCardInfo({name: cardInfo['name'], type: cardInfo['type'], number: cardInfo['number'], security: cardInfo['security'], expirationMonth: cardInfo['expirationMonth'], expirationYear: e.target.value})}>
											<option value="">Year</option>
											<option value="2022">2022</option>    
											<option value="2023">2023</option>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
											<option value="2026">2026</option>
											<option value="2027">2027</option>    
											<option value="2028">2028</option>
											<option value="2029">2029</option>
											<option value="2030">2030</option>    
											<option value="2031">2031</option>
											<option value="2032">2032</option>
											<option value="2033">2033</option>
										</select>
									</li>
								</ul>
							</ul>
						</li>
						<li>
							<label className={alreadyReserved ? 'container-title2' : 'hide'}>You already have a reservation! Click <a href='reserveinfo'>here</a> to view and/or cancel your current reservation.</label>
						</li>
						<li>
							<button className={hightraffic ? 'Submit' : 'hide'} type='submit'>Submit</button> 
						</li>
					</ul>
				</div>
				<ul className={suggestRegister && !alreadyReserved ? 'information-boxes' : 'hide'}>
					<label className='container-title2'>HEY, WE NOTICED YOU AREN'T LOGGED IN!</label>
					<p className='container-description'>You can login <a href='login'>here</a>, or if you don't have an account, you can register <a href='register'>here</a>.</p>
					<i className='container-option' onClick={() => ReserveAnyways()}>Proceed without registering</i>
				</ul>
				<ul className={alreadyReserved ? 'information-boxes' : 'hide'}>
					<label className='container-title2'>YOU ALREADY HAVE A RESERVATION</label>
					<p className='container-description'>You can view and/or cancel your current reservation <a href='reserveinfo'>here</a>, or click <button className='container-option-button' onClick={() => navigate('/')}>here</button> to return to our home page.</p>
				</ul>
			</form>
		</div>
	)
}

export default Reserve;