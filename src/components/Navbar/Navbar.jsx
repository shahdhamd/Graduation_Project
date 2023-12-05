import React from 'react'
import  style from'./Navbar.module.css'
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({logout,loginData}) {
  return (

    <div className={style.container}>
    <div className={style.navbar} >
      {loginData?<><span>{loginData.userName}</span></>:''}
<img src='images/leafLogo.jpg' alt='leaflogo' /> 
   <div>
  <Link to='/home' className={style.link}><span>الصفحة الرئيسية</span></Link>
  {loginData? <>  
  <Link to='/signup' className={style.link}>  <button className={style.btn2}>انشاء حساب</button></Link>
<Link  onClick={logout} className={style.link}>  <button className={style.btn2}>تسجيل الخروج </button></Link>

  </>:<>
    <Link to='/login' className={style.link} > <button className={style.btn1}>تسجيل الدخول</button></Link>
    <Link to='/signup' className={style.link}>  <button className={style.btn2}>انشاء حساب</button></Link>
</>
  }
  
</div>
 </div>
 </div>
  )
}
