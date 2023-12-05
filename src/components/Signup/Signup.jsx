import React, { useState } from 'react'
import style from './Signup.module.css';
import axios from 'axios';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  let [ErrorList,setErrorList]=useState('')
  let [backendError ,setBackendError]=useState('')
  let [user,setUser]=useState({
    userName:'',
    email:'',
    passward:''
  });

  let navigate=useNavigate();
  function goToLogin(){
    let path='/login';
    navigate(path)
  }

  function validation(){
    const schema=joi.object({   
      userName:joi.string().required().min(3).max(25),
      email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      passward:joi.string().required(),
    })
    return schema.validate(user,{abortEarly:false}); /// بمعنى طبق الفنكشن على المتغير يوزر
  }

  let getFormValue=(e)=>{
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(e.target.value)
    setErrorList('')

  }

  let submitForm=async(e)=>{
    e.preventDefault();
    let validateForm=validation();
    if (validateForm.error) {
      console.log("Validation error:", validateForm.error.details);
      setErrorList(validateForm.error.details);

      console.log('error list   ',ErrorList)
      // console.log('error    ',ErrorList[0].message)
    } else {
      console.log("Validation successful");
      console.log('submit ',user)
      let {data}=await axios.post('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/signup',user)
      console.log({data})
    if(data.message==='sucess'){
      console.log('sucess')
      goToLogin();
    }else{
      let error=JSON.stringify(data);
      console.log('data ',error)

      setBackendError(error)
    }
    console.log("Error ",ErrorList);
    }


  }
    return (
      <div className={style.container}>       
        <div className={style.header}>
          <div className={style.text}>انشاء حساب جديد</div>
          <div className={style.underline}></div>
        </div>
      <form className={style.big_input} onSubmit={submitForm}>
        <div className={style.inputs}>
          <div className={style.input}>
          <input type='text'  onChange={getFormValue} name='userName' placeholder='اسم المستخدم' style={{ textAlign: 'right' }} />
          <i className="fa-solid fa-user"></i>          
          </div>
        </div>
        <div className={style.inputs}>
          <div className={style.input}>
          <input type='text'  onChange={getFormValue} name='email' placeholder='البريد الالكتروني' style={{ textAlign: 'right' }} />
          <i className="fa-solid fa-envelope"></i>            
          </div>
        </div>
        <div className={style.inputs}>
          <div className={style.input}>
          <input type='password'  onChange={getFormValue} name='passward' placeholder='كلمة المرور' style={{ textAlign: 'right' }} />
          <i className="fa-solid fa-lock"></i>            
          </div>
      </div> 
      <div className='mt-3'>
  {ErrorList ? (
    <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{ErrorList[0].message}</div>
  ) : (
    backendError ? (
      <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{backendError}</div>
    ) : ''
  )}
</div>
        <button className={style.submit} type='submit'>انشاء الحساب</button>
      </form>
      </div>
    )
}