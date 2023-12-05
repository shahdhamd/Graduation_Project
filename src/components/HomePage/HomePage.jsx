import React, { useEffect } from 'react'
import Header from '.././Header/Header'
import ScanImage from '.././ScanImage/ScanImage'
import Search from '.././Search/Search'
import Home from '.././Home/Home'
import Plantes from '.././Plantes/Plantes'
import Footer from '.././Footer/Footer'
export default function HomePage(props) {
  useEffect(() => {
    const closeBrowser = () => {
      localStorage.removeItem('token');
    };
    window.addEventListener('beforeunload', closeBrowser);

    return () => {
      window.removeEventListener('beforeunload', closeBrowser);
    };
  }, []); 
  return (

    <div>
    <Home />
    <Header />
    <ScanImage />
    <Search value={props.value} 
    setValue={props.setValue} data={props.data} setShow ={props.setShow} searchBar={props.searchBar} />
    <Plantes />
    <Footer />
    </div>
  )
}