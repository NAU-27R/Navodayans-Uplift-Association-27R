import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { auth } from './component/authentication/firebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import {setPath} from './features/pathSlice'

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
import { RiH1 } from 'react-icons/ri'


const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;
  const [showHeader,setShowHeader] = useState(false);

  const path = useSelector((state)=>state.path.value);
  const dispatch = useDispatch();

  onAuthStateChanged(auth,(userCredentials)=>{
    if(userCredentials){
      if(userCredentials.emailVerified)setShowHeader(true);
    }
    else setShowHeader(false);
  })

  // useEffect(()=>{
  //   console.log(path)
  //   // setTimeout(() => {
  //   //   dispatch(setPath("/members"))
  //   // }, 2000);
  // },[path])

  return (
    <BrowserRouter>
      {showHeader && <Header/>}
      {path =="home" && <Home/>}
      {path =="members" && <Members/>}
      {path =="transactions" && <Transactions/>}
      {path =="donate" && <Donate/>}
      {path =="terms_conditions" && <TermsConditions/>}
      {path =="privacy_policy" && <PrivacyPolicy/>}
      {path =="refund_policy" && <RefundPolicy/>}
      {/* <Routes>
        <Route path="/Navodayans-Uplift-Association-27R" element={<Home />} />
        <Route path="/Navodayans-Uplift-Association-27R/members" element={<Members />} />
        <Route path="/Navodayans-Uplift-Association-27R/transactions" element={<Transactions />} />
        <Route path="/Navodayans-Uplift-Association-27R/donate" element={<Donate />} />
        <Route path="/Navodayans-Uplift-Association-27R/terms_conditions" element={<TermsConditions />} />
        <Route path="/Navodayans-Uplift-Association-27R/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/Navodayans-Uplift-Association-27R/refund_policy" element={<RefundPolicy />} />
        
        <Route path='*' element={<Page404/>} />
      </Routes> */}
         <Footer/>
    </BrowserRouter>
  )
}

export default App
