import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })


  const { name, email, password, confirm_password } = formData


  const handleSubmit = (e) => {

  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className='form-control' />

          </div>
        </form>
      </section>
    </>
  )
}

export default Login