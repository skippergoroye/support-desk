import React from "react";
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Spinner from "../components/Spinner";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email,  password, confirm_password } = formData;


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }


    // Redirect when logged in
    if(isSuccess || user){
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

    if(password !== confirm_password){
      toast('Password does not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
    // console.log('submited')
  };

  if(isLoading) {
    <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Please enter your name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
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
            <input
              type="password"
              id="confirm_password"
              className="form-control"
              placeholder="Please confirm password"
              name="confirm_password"
              value={confirm_password}
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
