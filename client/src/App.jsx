import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import Header from './component/header/Header'
import { auth } from './component/authentication/firebaseConfig'

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
        <Route path="/" element={<Home />} />
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
