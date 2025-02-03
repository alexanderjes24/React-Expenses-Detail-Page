import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import ExpensesDetail from './ExpensesDetail'


const App = () => {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/expenses-detail" element={<ExpensesDetail />} />
      </Routes>
    </Router>
  )
}

export default App
