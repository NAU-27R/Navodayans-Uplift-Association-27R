import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { auth } from './component/authentication/firebaseConfig'

import Header from './component/header/Header'
import Home from './pages/home/Home'
import Donate from './pages/donate/Donate'
import Transactions from './pages/transactions/Transactions'
import Members from './pages/members/Members'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

const App = () => {
  const [showHeader,setShowHeader] = useState(false);

  onAuthStateChanged(auth,(userCredentials)=>{
    if(userCredentials){
      if(userCredentials.emailVerified)setShowHeader(true);
    }
    else setShowHeader(false);
  })

  return (
    <BrowserRouter>
      {showHeader && <Header/>}
      <Routes>
        <Route path="/JNVR-27" element={<Home />} />
        <Route path="/JNVR-27/members" element={<Members />} />
        <Route path="/JNVR-27/transactions" element={<Transactions />} />
        <Route path="/JNVR-27/donate" element={<Donate />} />
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
