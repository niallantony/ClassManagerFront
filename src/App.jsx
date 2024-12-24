import './App.css'
import { Login } from './routes/Login'
import { Splash } from './routes/Splash'
import { Loader } from './routes/Loader'
import { SignUp } from './routes/SignUp'
import { Layout } from './routes/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './routes/Dashboard'
import { Subjects } from './routes/Subjects'
import { ThemeProvider } from 'styled-components'
import { SubjectPage } from './routes/SubjectPage'
import { DisplayError } from './routes/DisplayError'
import { Lessons } from './routes/Lessons'

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
              <Route path='notfound' element={<DisplayError code="400" message="Subject Not Found" />} />
            </ Route>
            <Route path="lessons">
              <Route index element={<Lessons />} />
            </Route>
            <Route path='*' element={<DisplayError code="404" message="Page Not Found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
