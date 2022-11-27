import React from 'react'
import Login from './Components/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './Redux/Store'
import { Provider } from 'react-redux'
import AddUser from './Components/AddUser/AddUser'
import User from './Components/User/User'
import MainDashBoard from './Components/DashBoard/MainDashBoard'
import Data from './Components/Data/Data'
import EditUser from './Components/EditOrViewUser/EditUser'
const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/dashboard" element={<MainDashBoard />} />
            <Route path="/user" element={<User />} exact />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/add/:id" element={<EditUser />} />
            <Route path="/leads" element={<Data />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App