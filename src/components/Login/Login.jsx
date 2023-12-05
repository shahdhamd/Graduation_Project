import React, { useState } from 'react'
import style from '.././Signup/Signup.module.css'
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import joi from 'joi';
import axios from 'axios';
export default function Login({ setData }) {
  let [errorList, setErrorList] = useState('')
  let [backendError, setBackendError] = useState('')
  let [user, setUser] = useState({   // عرفنا اوبجكت لتخزين مدخلات الجاي من الانبوت فيها
    email: '',   // بتفق مع الباك اند ايش بطلب في الساين ان
    passward: '' // نفس الاسماء في السكيماا
  })


  let getFormValue = (e) => {
    let myUser = { ...user };   //deep copy هيك بكون المتغيرين كل واحد باشر على مكان مختلف يسمى
    myUser[e.target.name] = e.target.value;  /// استخدمنا الطريقة الثانية
    setUser(myUser)
    console.log(user)
  }
  function validation() {
    const schema = joi.object({   /// بروح على اوبجكت معين واعمل فاليديشن
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      passward: joi.string().required(),
    })
    return schema.validate(user); /// بمعنى طبق الفنكشن على المتغير يوزر
  }

  let navigate = useNavigate();

  let goToHome = () => {
    let path = '/home'
    navigate(path)
  }
  let submitForm = async (e) => {
    e.preventDefault();

    try {
      let validateForm = validation();

      if (validateForm.error) {
        console.log("Validation error:", validateForm.error.details);
        setErrorList(validateForm.error.details);
      } else {
        console.log("Validation successful");

        let { data } = await axios.post("https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/signin", user);

        console.log('data ', data);

        if (data.message === 'sucess') {
          let token=data.token; 
          // token = `shahd__${data.token}`; // Initialize the variable
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('token'));
          goToHome();
          setData();
        } else {
          let error = JSON.stringify(data);
          console.log('data ', error);
          setBackendError(error);
          setErrorList(data.message);
        }
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };



  return (

    <div className={style.container} >
      <div className={style.header}>
        <div className={style.text}>تسجيل الدخول</div>
        <div className={style.underline}></div>
      </div>
      <form onSubmit={submitForm}>
        <div className={style.big_input}>
          <div className={style.inputs}>
            <div className={style.input}>
              <input type='email' placeholder='البريد الالكتروني' name='email' onChange={getFormValue} style={{ textAlign: 'right' }} />
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
          <div className={style.inputs}>
            <div className={style.input}>
              <input type='password' placeholder='كلمة المرور' name='passward' onChange={getFormValue} style={{ textAlign: 'right' }} />
              <i className="fa-solid fa-lock"></i>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          {errorList ? (
            <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{errorList[0].message}</div>
          ) : (
            backendError ? (
              <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{backendError}</div>
            ) : ''
          )}
        </div>
        <Link className={style.forgot_password} to='/SendCode'>هل نسيت كلمة السر؟<span><a >اضغط هنا</a></span></Link>
        <button className={style.submit} type='submit'>تسجيل الدخول</button>
      </form>
    </div>
  )
}
