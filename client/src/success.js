import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

function Success() {
    const [searchParams]= useSearchParams()
    const [result,setResult]= useState("")
useEffect(()=>{
axios
.post(`http://localhost:5000/api/payment/${searchParams.get("payment_id")}`)
.then((response) => {
   setResult(response.data.result.status)
    })
    .catch((error) => {
        console.error(error);
        });
        },[])



  return (
  <React.Fragment> 
    {result==="SUCCESS" && (<div className='p-4'>
    <div className='alert alert-success'>
successful paiment
    </div>

</div>)}
</React.Fragment>
   
  )
}

export default Success
