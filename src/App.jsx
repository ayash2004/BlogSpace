import { useState, useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import { AppwriteException } from "appwrite";
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)  
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        console.log("👤 Current user:", userData);
        if(userData){
          dispatch(login(userData))
        } else{
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [] )
  
  return !loading ? (

  <div className='min-h-screen flex flex-wrap content-between'>
    <div className='w-full '>
      <Header />
      <main className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 ">
        <Outlet />
      </main>
      <Footer />
      
    </div>
  </div>
  
) :  (null)
}

export default App
