import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import bgImage from '../assets/hero.jpg'


const Login = ({setToken}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const OnSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      toast.error(error.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
  <section
    id="home"
    className="relative min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="absolute inset-0 bg-black/60" />

    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur shadow-xl px-8 py-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Admin Login
        </h1>

        <form onSubmit={OnSubmitHandler}>
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-gray-600">
              Email Address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-800 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-gray-600">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-800 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-amber-400 py-2 text-lg font-bold text-black transition hover:bg-amber-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </section>
)

}

export default Login