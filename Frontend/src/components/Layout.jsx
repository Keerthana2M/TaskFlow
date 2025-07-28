import React, { useState } from 'react'
import Navbar from './Navbar';
import sidebar from './sidebar';

const  Layout=({onLogout,user})=> {
    const [tasks,setTasks] =useState([]);
  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar user={user} onLogout={onLogout}/>
        <sidebar user={user} task={tasks}/>
        <div className='ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300'></div>
    </div>
  )
}

export default Layout
