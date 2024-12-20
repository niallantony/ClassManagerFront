import './App.css'
import { Login } from './pages/Login'
import { Splash } from './components/Splash'
import { Loader } from './pages/Loader'
import { SignUp } from './pages/SignUp'
import { Layout } from './pages/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Subjects } from './pages/Subjects'
import { ThemeProvider } from 'styled-components'
import { SubjectPage } from './pages/SubjectPage'

const theme = {
    dark: "#353535",
    accent: "#3C6E71",
    light: "#FFFFFF",
    hover: "#d7dddd",
    light2: "#c9d2d4",
    error: "#d46565",
    darkAccent: "#284b53",
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Loader />} />
                    <Route path="/splash" element={<Splash />}>
                        <Route path="signup" element={<SignUp />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                    <Route path="/dash" element={<Layout />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="subjects" >
                            <Route index element={<Subjects />} />
                            <Route path='subject/:subject_id' element={<SubjectPage />} />
                        </ Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
