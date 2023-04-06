import React, { useEffect } from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import  { useNavigate } from 'react-router-dom'
import Spinner from "../components/Spinner";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";



function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    // Redirect Login Page

    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    // console.log(formData)
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
    // console.log('submited')
  };

  if(isLoading){
    <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login to get support</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Please enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Please enter your password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
