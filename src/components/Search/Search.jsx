import React from 'react'
import style from './Searc.module.css'

export default function Search(props) {
  return (
    <div className={style.search} style={{ background:` url('images/newsletterbg.jpg')`}}>
        <div className={style.searchbar}>  
        <input type="text" placeholder="ابحث عن اسم النبات الشائع له باللغة العربية" name="" id=""
         value={props.value} onChange={
          (e)=>{
            if (typeof props.setValue === 'function')
            props.setValue(e.target.value)
          }
        }/>
        <button onClick={()=>{
          if(props.value !== ''){
            console.log(props.value)
            if (typeof props.searchBar === 'function'){
            console.log(props.value)
          props.searchBar(props.value)}
        }
  
      }}
          >بحث
        </button>
        </div>
    </div>
  )
}
