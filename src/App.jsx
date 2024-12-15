import './App.css'
import { Login } from './pages/Login'
import { Splash } from './components/Splash'
import { Loader } from './pages/Loader'
import { SignUp } from './pages/SignUp'
import { Layout } from './pages/Layout'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Loader /> } />
          <Route path="/splash" element={<Splash />}>
            <Route path="signup" element={ <SignUp /> } />
            <Route path="login" element={ <Login /> } />
          </Route>
         <Route path="/dash" element= {<Layout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
