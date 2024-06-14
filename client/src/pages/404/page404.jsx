import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
const Page404 = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        navigate('/Navodayans-Uplift-Association-27R');
    },[])
  return (
    <div>
      <h1>404</h1>
    </div>
  )
}

export default Page404
