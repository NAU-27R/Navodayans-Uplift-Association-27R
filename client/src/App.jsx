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
import PrivacyPolicy from './pages/privacy_policy/privacyPolicy'
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
    <BrowserRouter>
      {showHeader && <Header/>}
      <Routes>
        <Route path="/Navodayans-Uplift-Association-27R" element={<Home />} />
        <Route path="/Navodayans-Uplift-Association-27R/members" element={<Members />} />
        <Route path="/Navodayans-Uplift-Association-27R/transactions" element={<Transactions />} />
        <Route path="/Navodayans-Uplift-Association-27R/donate" element={<Donate />} />
        <Route path="/Navodayans-Uplift-Association-27R/terms_conditions" element={<TermsConditions />} />
        <Route path="/Navodayans-Uplift-Association-27R/privacy_policy" element={<PrivacyPolicy />} />
        
        {/* <Route path='*' element={<Page404/>} /> */}
      </Routes>
        {showHeader && <Footer/>}
    </BrowserRouter>
  )
}

export default App
