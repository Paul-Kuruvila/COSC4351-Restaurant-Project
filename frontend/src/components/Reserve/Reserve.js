import React, {useState} from 'react'
import './Reserve.css'

function Reserve() {
    const redirectHandler = (ref) => {
        window.location.href=`${ref}`;
      }
      const [name, setName] = useState();
      const [phonenum, setPhonenum] = useState();
      const [email, setEmail] = useState();
      const [guests, setGuests] = useState();

      //number of guests and date n time 

      const handleSubmit = async (e) => { //sending data
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            //credentials: "include",
            //body: JSON.stringify(loginData)
        };
  
        const response = await fetch('/auth', options)
        const jsonData = await response.json();

    }
    
      return (
        <div className='Reserve'>
            <form onSubmit = {handleSubmit}>
                  <ul className="information-boxes">
                    <li className='fullname'>
                          <label className="name">Name:</label>
                          <input id="names" className="inputbox" type="text" title="Please enter your name." required placeholder="Enter your name."
                          onChange = {(e) => setName(e.target.value)}
                          />
                    </li>
                    <li className='phone'>
                          <label className="phonenum">Phone Number:</label>
                          <input id="phonenumber" className="inputbox" type="text" title="Please enter your phone number." required placeholder="Enter your phone number."
                          onChange = {(e) => setPhonenum(e.target.value)}
                          />
                    </li>
                    <li className='e-mail'>
                          <label className="emailinfo">Email:</label>
                          <input id="email" className="inputbox" type="text" title="Please enter your email." required placeholder="Enter your email."
                          onChange = {(e) => setEmail(e.target.value)}
                          />
                    </li>
                    <li className='numguests'>
                          <label className="number of guests">Number of Guests:</label>
                          <input id="guests" className="inputbox" type="text" title="Please enter the number of guests." required placeholder="Enter the number of guests."
                          onChange = {(e) => setGuests(e.target.value)}
                          />
                    </li>
                    <form>
                        <label className = "labelofDT">Date and Time:</label>
                        <input type = "datetime-local" id = "DT" name = ""></input>
                    </form>
                    <li>
                           <button className="Submit" type="submit">Submit</button> 
                    </li>
                  </ul>
            </form>
        </div>
      )
}

export default Reserve

