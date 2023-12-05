import React, { useState } from 'react';
import joi, { func } from 'joi'
import axios from 'axios';
import { Navigation, useNavigate } from 'react-router-dom';
import './ForgetPassword.css'
function ForgetPassword() {

    let submitForm = async (e) => {
        e.preventDefault();
        let validateForm = validation();
        if (validateForm.error) {
          console.log("Validation error:", validateForm.error.details);
          setErrorList(validateForm.error.details);
          console.log('error list   ', ErrorList)
          // console.log('error    ',ErrorList[0].message)
        } else {
          console.log("Validation successful");
          console.log('submit code   ', UserEmail.code)
          let { data } = await axios.patch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/forgetpassword', UserEmail)
          console.log('data', data)
          goToLogin()
        }
      }

      function validation() {
        const schema = joi.object({
          email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          newPassward: joi.string().required(),
          code:joi.string().required()
        })
        return schema.validate(UserEmail, { abortEarly: false }); /// بمعنى طبق الفنكشن على المتغير يوزر
      }
      let [UserEmail, setUserEmail] = useState({
        email: '',
        newPassward: '',
        code: ''
      })
      let navigate = useNavigate();
      function goToLogin(){
        navigate('/login')
      }

      let [ErrorList, setErrorList] = useState('')
      let getFormValue = (e) => {
        let myEmail = { ...UserEmail };
        myEmail[e.target.name] = e.target.value;
        setUserEmail(myEmail);
        console.log(e.target.value)
        setErrorList('')
      }

  return (
    <div className='forget'>
      <div className="reset">
        <h2>Password Reset</h2>
        <p>Enter your email address to receive a reset code.</p>
        <form id="email-form" onSubmit={submitForm}>
          <input type="email" id="email" name='email' onChange={getFormValue} placeholder="Enter your email" required />
          <input type="text" id="reset-code" name='code' onChange={getFormValue} placeholder="Enter reset code" required />
          <input type='text' name='newPassward' placeholder='Enter new password' required onChange={getFormValue} />
          <button type="submit" >Verify Code</button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword