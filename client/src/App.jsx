import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { auth } from './component/authentication/firebaseConfig'

import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import Home from './pages/home/Home'
import Donate from './pages/donate/Donate'
import Transactions from './pages/transactions/Transactions'
import Members from './pages/members/Members'
import axios from 'axios'
import TermsConditions from './pages/termsCondtions/TermsConditions'
import PrivacyPolicy from './pages/policy/privacyPolicy'
import RefundPolicy from './pages/policy/refundPolicy'
import Page404 from './pages/404/page404'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const App = () => {
  const [showHeader,setShowHeader] = useState(false);

  onAuthStateChanged(auth,(userCredentials)=>{
    if(userCredentials){
      if(userCredentials.emailVerified)setShowHeader(true);
    }
    else setShowHeader(false);
  })

  return (
    <BrowserRouter basename='/Navodayans-Uplift-Association-27R'>
      {showHeader && <Header/>}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/terms_conditions" element={<TermsConditions />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/refund_policy" element={<RefundPolicy />} />
        
        {/* <Route path='*' element={<Page404/>} /> */}
      </Routes>
        {showHeader && <Footer/>}
    </BrowserRouter>
  )
}

export default App
