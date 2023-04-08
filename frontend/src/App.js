import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Newticket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket'



function App() {
  return (
    <>
    <ToastContainer />
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path='/new-ticket' element={<PrivateRoute/>}>
                <Route path='/new-ticket' element={<Newticket/>}/>
            </Route>

            <Route path='/tickets' element={<PrivateRoute/>}>
                <Route path='/tickets' element={<Tickets/>}/>
            </Route>

            <Route path='/ticket/:ticketID' element={<PrivateRoute/>}>
                <Route path='/ticket/:ticketID' element={<Ticket/>}/>
            </Route>
  
          </Routes>
        </div>       
      </Router>
    </> 
  );
}

export default App;
