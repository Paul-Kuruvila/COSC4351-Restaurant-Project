import './Profile.css'
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

//html/validation/etc. handled by Paul; http requests handled by Eric ; button handler for testing by David
const Profile = ({label}) => {
    const navigate = useNavigate();
    const [canEdit, setEdit] = useState(false);
    const [name, setName] = useState();
    const [phoneNum, setPhoneNum] = useState();
    const [email, setEmail] = useState();
    const [mailaddress, setMailAddress] = useState();
    const [billaddress, setBillAddress] = useState();
    const [diner, setDiner] = useState();
    const [payment, setPayment] = useState();

    function editFields() {
        // let fields = ['name','email','mailaddress','billaddress','diner'];
        // for(let i=0; i < fields.length; i++){
        //     document.getElementById(fields[i]).removeAttribute('readonly');
        // }
        document.getElementById('payment').disabled = 'false';
        // let buttons = ['save', 'logout', 'reserve'];
        // for(let i=0; i < buttons.length; i++){
        //     document.getElementById(buttons[i]).style.margin = '15px';
        // }
        // document.getElementById('edit').style.display = 'none';
    }

    function checkFields(e) {
        console.log(document.getElementById('name').value[0])
        if(document.getElementById('name').value[0]===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else if(document.getElementById('email').value[0]===" "){
            alert("One or more required fields empty! Cannot start fields with a space!");
            e.preventDefault();
        } else if(document.getElementById('mailaddress')===" "){
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

    const updateFields = async () => {
        let data = [];
        try {
            data = await profileData();
            if(data.fullname !== "undefined"){
                setName(data.name);
                if(data.email !== 'undefined')
                    setEmail(data.email);
                else
                    setEmail('');
                setPhoneNum(data.phonenum);
                if(data.mailaddress !== "undefined")
                    setMailAddress(data.mailaddress);
                else
                    setMailAddress('');
                if(data.billaddress !== "undefined")
                    setBillAddress(data.billaddress);
                else
                    setBillAddress('');
                setDiner(data.diner);
                setPayment(data.payment);
            }
        } catch (e) {
            console.log("Error fetching profile data from backend");
            editFields();
            console.log(e);
        }
        console.log(data);
    }

    const profileData = async () => { //retrieving profile data from backend which is retrieved from database
        const response = await fetch('/profiledata');
        const jsonData = await response.json();

        return jsonData;
    }

    document.addEventListener("DOMContentLoaded", async () => {
        updateFields(); //set variables for visual rendering on page load
    })

    const handleSubmit = async(e) => { //sending data to backend
        e.preventDefault();
        setPayment(document.getElementById('payment').value); //was state before
        let email_value, mailaddress_value, billaddress_value;
        if(email === '')  email_value = undefined;
        if(mailaddress === '')  mailaddress_value = undefined;
        if(billaddress === '')  billaddress_value = undefined;
        const profileData = {name, phoneNum, email_value, mailaddress_value, billaddress_value, diner, payment};
        
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
        <div style={{height: '5rem'}}></div>
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
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className='Label'>Phone Number:</label>
                        <input className='inputbox' type='text' title='Please enter your phone number.' minLength="10" maxLength="10" required placeholder='Enter your phone number.'
                        value = {phoneNum}
                        onChange = {(e) => setPhoneNum(e.target.value)}
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">E-mail:</label>
                        <input className="inputbox" id="email" type="text" minLength="1" maxLength="100"  placeholder="Enter your e-mail address."
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        onSelect = {(e) => checkEmpty(e)}
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Mailing Address:</label>
                        <input className="inputbox" id="mailaddress" type="text" minLength="1" maxLength="100"  required placeholder="Enter your mailing address."
                        value = {mailaddress}
                        onChange = {(e) => setMailAddress(e.target.value)}
                        onSelect = {(e) => checkEmpty(e)}
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Billing Address:</label>
                        <input className="inputbox" id="billaddress" type="text" maxLength="100" title='Enter your billing address, if different than mailing address.' placeholder="Enter billing address."
                        value = {billaddress}
                        onChange = {(e) => setBillAddress(e.target.value)}
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Preferred Diner:</label>
                        <input className="inputbox" id="diner" type="text" minLength="1" maxLength="100" required placeholder="Enter your preferred diner number."
                        value = {diner}
                        onChange = {(e) => setDiner(e.target.value)}
                        onKeyPress = {(e) => requireNums(e)}
                        onSelect = {(e) => checkEmpty(e)}
                        disabled = {!canEdit}
                        />
                    </li>
                    <li className='guest-info'>
                        <label className="Label">Payment:</label>
                        <select className="inputbox" id="payment" name="state" defaultValue={""} value={payment} onChange = {(e) => setPayment(e.target.value)} required disabled = {!canEdit}>
                            <option value="">Select a payment method</option>
                            <option value="credit">Credit</option>    
                            <option value="cash">Cash</option>
                            <option value="check">Check</option>
                        </select>
                    </li>
                </ul>
                <li>
                    <div onClick={() => setEdit(true)} id="edit" hidden={canEdit}>Edit Information</div>
                </li>
                <li>
                    <button data-testid="Submit" className="Submit" id='save' type="submit" hidden={!canEdit} onClick={(e) => checkFields(e)}>Save{label}</button>
                    <div className='container-option-button' style={{marginLeft: '1rem'}} hidden={!canEdit} onClick={() => { setEdit(false); updateFields(); }}>Cancel</div>
                </li>
                <li>
                    <button data-testid="button" className="Submit" id='reserve'  type="button" hidden={canEdit} onClick={() => { 
                        navigate('/reserve');
                        document.location.reload('true'); 
                    }}>Reserve a Table</button>
                </li>
            </ul>
            
        </form>
        
      </div>
    );
}

export default Profile;
