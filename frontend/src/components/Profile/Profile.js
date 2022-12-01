import './Profile.css'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

//html/validation/etc. handled by Paul; http requests handled by Eric ; button handler for testing by David
const Profile = ({label}) => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [mailaddress, setMailAddress] = useState();
    const [billaddress, setBillAddress] = useState();
    const [diner, setDiner] = useState();
    const [payment, setPayment] = useState();

    function editFields() {
        let fields = ['name','mailaddress','billaddress','diner','payment'];
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
            alert("One or more required fields empty!");
            e.preventDefault();
        } else if(document.getElementById('city').value[0]===" "){
            alert("One or more required fields empty!");
            e.preventDefault();
        } else if(document.getElementById('zipcode')===" "){
            alert("One or more required fields empty!");
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
                setMailAddress(data.mailaddress);
                if(data.BillAddress !== "undefined")
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
<<<<<<< HEAD
        //state = document.getElementById('payment').value; //was state before
=======
        payment = document.getElementById('payment').value; //was state before
>>>>>>> 233665bd146e6ee0f1d29f85d250b67a1472bd14
        const profileData = {name, mailaddress, billaddress, diner, payment};
        
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
                <li className='guest-info'>
                    <label className="">Full Name</label>
                    <input className="inputbox" id="name" type="text" minLength="2" maxLength="50" required placeholder="Enter your first and last name."
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    onKeyPress = {(e) => requireChars(e)}
                    onSelect = {(e) => checkEmpty(e)}
                    readOnly="readonly"
                    />
                </li>
                <li className='guest-info'>
                    <label>Mailing Address</label>
                    <input className="inputbox" id="address" type="text" minLength="2" maxLength="100"  required placeholder="Enter your mailing address."
                    value = {mailaddress}
                    onChange = {(e) => setMailAddress(e.target.value)}
                    onSelect = {(e) => checkEmpty(e)}
                    readOnly="readonly"
                    />
                </li>
                <li className='guest-info'>
                    <label>Billing Address</label>
                    <input className="inputbox" id="address2" type="text" maxLength="100" placeholder="Enter your billing address, if applicable."
                    value = {billaddress}
                    onChange = {(e) => setBillAddress(e.target.value)}
                    readOnly="readonly"
                    />
                </li>
                <li className='guest-info'>
                    <label>Diner</label>
                    <input className="inputbox" id="diner#" type="text" minLength="2" maxLength="100" required placeholder="Enter your preferred diner number."
                    value = {diner}
                    onChange = {(e) => setDiner(e.target.value)}
                    onKeyPress = {(e) => requireNums(e)}
                    onSelect = {(e) => checkEmpty(e)}
                    readOnly="readonly"
                    />
                </li>
                <li className='guest-info'>
                    <label>Payment</label>
                    <select className="inputbox" id="payments" name="state" defaultValue={""} value={payment} onChange = {(e) => setPayment(e.target.value)} disabled={true}>
                        <option value="">Select a payment method</option>
                        <option value="credit">Credit</option>    
                        <option value="cash">Cash</option>
                        <option value="check">Check</option>
                    </select>
                </li>
                <li>
                    <div onClick={() => editFields()} id="edit" className="editbutton">Edit Information</div>
                </li>
                <li>
                    <div id="save" className = "submitbutton">
                        <button data-testid="Submit"  className="Submit" type="submit" onClick={() => checkFields()}>Save{label}</button>
                    </div>
                </li>
                <div id="fuelquote" className = "submitbutton">
                <a href="\fuelquoteform">
                    <button data-testid="button" className="Submit" type="button">Reserve a Table</button>
                </a>
            </div>
            </ul>
            
        </form>
        
      </div>
    );
}

export default Profile;
