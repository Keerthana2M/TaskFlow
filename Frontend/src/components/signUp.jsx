import { UserPlus } from 'lucide-react'
import React from 'react'

function signUp() {
  return (
    <div className='max-w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8'>
      <div className='mb-6 text-center'>
        <div className='w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4'>
          <UserPlus className='w-8 h-8 text-white'/>
        </div>
        <h2 className='text-2xl foont-bold text-gray-800'>
          Create Account
        </h2>
        <p className='text-gray-500 text-sm'></p>
      </div>
     signUp
    </div>
  )
}

export default signUp
