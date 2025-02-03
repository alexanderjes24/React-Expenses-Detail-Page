import { useNavigate, useLocation } from "react-router-dom"
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('incomeList')// Clear income list from localStorage
    localStorage.removeItem('expensesList')// Clear expenses list from localStorage
    navigate('/')
  }
  

  
  return (
    <div className="fixed top-0 left-0 w-screen h-16 bg-white flex items-center justify-evenly px-8 shadow-md">
        <ul className="flex space-x-14">
          <li className={`cursor-pointer ${
            location.pathname === '/home' ? 'font-bold' : ''
          } hover:!text-gray-400`}
          onClick={() => navigate('/home')}
          style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
        >Home</li>

          <li className={`cursor-pointer ${
            location.pathname === '/expenses-detail' ? 'font-bold' : ''
          } hover:!text-gray-400`}
          onClick={() => navigate('/expenses-detail')}
          style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
        >Expenses Detail</li>
        
          <li className="hover:!text-gray-400 cursor-pointer" style={{ textDecoration: 'none',color: 'inherit' }}
              onClick={() => handleLogout()}
        >Logout</li>
        </ul>
    </div>
  )
}

export default Navbar