import './Profile.css'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

//html/validation/etc. handled by Paul; http requests handled by Eric ; button handler for testing by David
const Profile = ({label}) => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [phoneNum, setPhoneNum] = useState();
    const [email, setEmail] = useState();
    const [billaddress, setBillAddress] = useState();
    const [diner, setDiner] = useState();
    const [payment, setPayment] = useState();

    function editFields() {
        let fields = ['name','email','billaddress','diner','payment'];
        for(let i=0; i < fields.length; i++){
            document.getElementById(fields[i]).removeAttribute('readonly');
        }
        document.getElementById('payment').removeAttribute('disabled'); //was state before
        let buttons = ['save', 'logout', 'fuelquote'];
        for(let i=0; i < buttons.length; i++){
            document.getElementById(buttons[i]).style.margin = '15px';
        }
        document.getElementById('edit').style.display = 'none';
    }

    function checkFields(e) {
        console.log(document.getElementById('name').value[0])
        if(document.getElementById('name').value[0]===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else if(document.getElementById('email').value[0]===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else if(document.getElementById('billaddress')===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else if(document.getElementById('diner')===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else {
            return;
        }
    }

    function checkEmpty(e) { // if field is empty or filled with spaces, then display placeholder text
        if(e.target.value === ' '){
            e.target.value = e.target.value.trim();
        }
    }

    function requireChars(e) { // prevents numbers from being typed
        console.log(e.key);
        console.log(e.target.value[0]);
        console.log(e.target.value.length);
        console.log(e.target.value);
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

    const profileData = async () => { //retrieving profile data from backend which is retrieved from database
        const response = await fetch('/profiledata');
        const jsonData = await response.json();

        return jsonData;
    }

    document.addEventListener("DOMContentLoaded", async () => { //set variables for visual rendering on page load
        let data = [];
        try {
            data = await profileData();
            if(data.fullname !== "undefined"){
                setName(data.name);
                setEmail(data.email);
                setPhoneNum(data.phonenum);
                if(data.billaddress !== "undefined")
                    setBillAddress(data.billaddress);
                setDiner(data.diner);
                setPayment(data.payment);
            }
        } catch (e) {
            console.log("Error fetching profile data from backend");
            editFields();
            console.log(e);
        }
        console.log(data);
    })

    const handleSubmit = async(e) => { //sending data to backend
        e.preventDefault();
        setPayment(document.getElementById('payment').value); //was state before
        const profileData = {name, phoneNum, email, billaddress, diner, payment};
        
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            //credentials: "include",
            body: JSON.stringify(profileData)
        };

        const response = await fetch('/profile', options);
        const jsonData = await response.json();
        
        if (jsonData.login && jsonData.savedInfo) { //if login status is true/successful and information is true/saved
            console.log(jsonData);
            document.location.reload('true');
          }
          else {
            console.log(jsonData);
        }
    }

    return (
      <div className="Login">
          <form onSubmit = {handleSubmit}>
            <ul className="information-boxes">
                <label className='container-title'>Profile</label>
                <ul className='boxes-container'>
                    <li className='guest-info'>
                        <label className="Label">Full Name:</label>
                        <input className="inputbox" id="name" type="text" minLength="2" maxLength="50" required placeholder="Enter your first and last name."
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        onKeyPress = {(e) => requireChars(e)}
                        onSelect = {(e) => checkEmpty(e)}
                        readOnly="readonly"
                        />
                    </li>
                    <li className='guest-info'>
                        <label className='Label'>Phone Number:</label>
                        <input className='inputbox' type='text' title='Please enter your phone number.' minLength="10" maxLength="10" required placeholder='Enter your phone number.'
                        value = {phoneNum}
                        onChange = {(e) => setPhoneNum(e.target.value)}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Mailing Address:</label>
                        <input className="inputbox" id="email" type="text" minLength="1" maxLength="100"  required placeholder="Enter your mailing address."
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        onSelect = {(e) => checkEmpty(e)}
                        readOnly="readonly"
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Billing Address:</label>
                        <input className="inputbox" id="billaddress" type="text" maxLength="100" placeholder="Enter your billing address, if applicable."
                        value = {billaddress}
                        onChange = {(e) => setBillAddress(e.target.value)}
                        readOnly="readonly"
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Preferred Diner:</label>
                        <input className="inputbox" id="diner" type="text" minLength="1" maxLength="100" required placeholder="Enter your preferred diner number."
                        value = {diner}
                        onChange = {(e) => setDiner(e.target.value)}
                        onKeyPress = {(e) => requireNums(e)}
                        onSelect = {(e) => checkEmpty(e)}
                        readOnly="readonly"
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Payment:</label>
                        <select className="inputbox" id="payment" name="state" defaultValue={""} value={payment} onChange = {(e) => setPayment(e.target.value)} disabled={true}>
                            <option value="">Select a payment method</option>
                            <option value="credit">Credit</option>    
                            <option value="cash">Cash</option>
                            <option value="check">Check</option>
                        </select>
                    </li>
                </ul>
                <li>
                    <div onClick={() => editFields()} id="edit" className="editbutton">Edit Information</div>
                </li>
                <li>
                    <div id="save" className = "submitbutton">
                        <button data-testid="Submit"  className="Submit" type="submit" onClick={(e) => checkFields(e)}>Save{label}</button> 
                    </div>
                </li>
                <div id="fuelquote" className = "submitbutton">
                <button data-testid="button" className="Submit" style={{height:'60px'}} type="button" onClick={() => { 
                    navigate('/reserve');
                    document.location.reload('true'); 
                }}>Reserve a Table</button>
            </div>
            </ul>
            
        </form>
        
      </div>
    );
}

export default Profile;
