import React from 'react'
import  './Model.css'

const Model =(props)=>{
    return (
        <>
        <div className='overlay'>
        <div className='Model'>
         <span className='X' onClick={()=>{
            props.setShow(false)
            props.setSearchResults([])
            props.setValue('')
         }}>X</span>   
    {
   props.searchResults.length ?
 (       props.searchResults.map((item,index)=>
       
        <div key={index} className='modelinfo' style={{height:'70vh'}}>
        <div style={{display: 'flex', alignItems:'center', fontSize :
    '16px', fontWeight :'500', textAlign:'right'}}>
       <img src={item.image}  className='img' alt='plantImage'/>
       <div style={{width:'60%'}}>
       <span>{item.EnglishName}</span>
       <span>{item.ArabicName}</span>
       </div>
    
       </div>
       <div style={{textAlign:'right', width:'60%', marginLeft:'auto', marginRight:'5%', fontWeight :'500', marginTop: '-10%'}}>
        <span style={{fontSize: '20px'}}>: الفوائد</span>
       <span>{item.benefit}</span>
       </div>
        </div>)):(<span style={{fontSize:'35px' ,
          display: 'flex' , justifyContent:"center" ,
           alignItems:"center" ,height : "80%"}}>نعتذر, لا تتوفر نتائج لبحثك</span>)
        
    }
        </div>
        </div>
        </>
    )
}

export default Model