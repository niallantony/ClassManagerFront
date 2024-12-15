import './App.css'
import { Login } from './pages/Login'
import { Splash } from './components/Splash'
import { Loader } from './pages/Loader'
import { SignUp } from './pages/SignUp'
import { Layout } from './pages/Layout'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Subjects } from './pages/Subjects'
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
            <Route path="" element={ <Dashboard /> }/>
            <Route path="subjects" element={ <Subjects /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
