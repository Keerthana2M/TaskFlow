import React, { useEffect,useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const App = () => {
  const navigate = useNavigate();
  const [currentUser,setCurrentUser] =useState(()=>{
    const stored = localStorage.getItem('currentUser');
    return stored ?JSON.parse(stored):null
  });

  useEffect(()=>{
    if(currentUser){
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
    }
    else{
      localStorage.removeItem('currentUser');
    }
  },[currentUser])

  const handleAuthSubmit =(data = {}) =>{
    const user ={
      id:data.id || data.userId,
      email:data.email,
      name:data.name ||'User',
      avatar:data.avatar ||''
    }
    setCurrentUser(user);
    navigate('/',{replace:true})
  }

  const handleLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentUser(null);
    navigate('/login',{replace:true});
  }

  const ProtectedLayout = () =>{
    if(!currentUser){
      return <Navigate to="/login" replace/>
    }
    return <Layout user={currentUser} onLogout={handleLogOut}/>
  }

  return (
   <Routes>
    <Route path='/login' element={<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <Login onSubmit ={handleAuthSubmit} onSwitchMode={()=>navigate('/SignUp')}/>
    </div>}/>

    <Route path='/SignUp' element={<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <SignUp onSwitchMode={()=>navigate('/login')}/>
    </div>}/>

    <Route element={<ProtectedLayout/>}>
      <Route path='/' element ={<Dashboard/>}/>
    </Route>
    <Route path='*' element={<Navigate to={currentUser ? '/' : '/login'} replace/>}/>
   </Routes>
  )
};

export default App;
