/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import DashboardIndex from './Pages/Dashboard/Index'
import CountryIndex from './Pages/Country/Index'
import StateIndex from './Pages/State/Index'
import CityIndex from './Pages/City/Index'
import UserIndex from './Pages/User/Index'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path='/' element={<DashboardIndex />} />
          <Route path='/country' element={<CountryIndex />} />
          <Route path='/state' element={<StateIndex />} />
          <Route path='/city' element={<CityIndex />} />
          <Route path='/user' element={<UserIndex />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
