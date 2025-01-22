import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Register from './Register'
import Home from './Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
