import React, { useEffect, useState } from 'react'
import './Hooksexample.css'

const Hooksexample = () => {
    const [count,setcount]=useState(0)
    const [data,setdata]=useState(null)
    const incrementcount=()=>{
setcount(prevcount=>prevcount+1)
    }

    useEffect(()=>{
        fetchdata();

    },[count])

   const fetchdata=()=>{
    setTimeout(()=>{
         setdata=`Data for count ${count}`
    })
    }


  return (

    <div> 
        <p>
Count : {count}
        </p>
        <button onClick={incrementcount}>
            Hooks
            </button>
        <p>
{data ? data : "Fectching"}
        </p>
       
    </div>
  )
}

export default Hooksexample