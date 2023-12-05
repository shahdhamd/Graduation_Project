import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import HomePage from './components/HomePage/HomePage'
import Model from './components/Model/Model';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import SendCode from './components/SendCode/SendCode';
import { jwtDecode } from 'jwt-decode';
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
export default function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('')
  let [show, setShow] = useState(false)
  let [searchResults, setSearchResults] = useState([])

  function logout() {
    localStorage.removeItem('token'); 
    setLoginData(null);
    return <Navigate to="/login" />;

  }


  let [loginData, setLoginData] = useState('')
  function setUserData() {
    let token = localStorage.getItem('token');
  console.log('token ',token)
  let decoded = jwtDecode(token);
  console.log(decoded);

  setLoginData(decoded);
  console.log('loginData', loginData);
  }

  const searchBar = (planetName) => {
    if (data && data.herb) {
      let plant = data.herb.filter((item) => item.ArabicName.includes(planetName))
      setShow(true)
      setSearchResults(plant)
    }
    console.log(searchResults)
  }

  useEffect(() => {
    const setUserData = () => {
      if (localStorage.getItem('token')) {
        let decoded = jwtDecode(localStorage.getItem('token'));
        setLoginData(decoded);
      }
    };

    setUserData();
    const fetchData = async () => {
      try {
        const response = await fetch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (

    <div>
      <div style={{ display: show ? 'block' : 'none' }}>
        <Model setShow={setShow} setSearchResults={setSearchResults} searchResults={searchResults} setValue={setValue} />
      </div>

      <Navbar logout={logout} loginData={loginData} />
      <Routes>
        <Route element={<ProtectedRoutes loginData={loginData} />} >

          <Route path="/" element={<Login />} setData={setUserData} />

          <Route path="home" element={< HomePage value={value} setValue={setValue} data={data} setShow={setShow} searchBar={searchBar} />} />
        </Route>
        <Route path="login" element={<Login setData={setUserData} />} />
        <Route path="signup" element={<Signup />} />
        <Route path='SendCode' element={<SendCode/>}/>
        <Route path='forgetpassword'  element={<ForgetPassword/>} />
      </Routes>

    </div>
  )
}

