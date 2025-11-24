import React, { useMemo } from 'react'
import { CheckCircle, Clock, ListTodo } from 'lucide-react'

function Sidebar({ user = {}, tasks = [] }) {
  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed
    return { completed, pending, total: tasks.length }
  }, [tasks])

  return (
    <aside className='fixed top-16 left-0 bottom-0 w-full md:w-60 lg:w-64 xl:w-64 bg-white border-r border-gray-100 shadow-sm overflow-y-auto px-4 py-6 space-y-6'>
      <div className='rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white p-4 shadow-lg'>
        <p className='text-sm text-white/90'>Welcome back</p>
        <p className='text-2xl font-semibold'>{user.name || 'User'}</p>
        <p className='text-xs text-white/80 mt-1'>{user.email}</p>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100'>
          <ListTodo className='text-purple-500' />
          <div>
            <p className='text-sm text-gray-500'>Total Tasks</p>
            <p className='text-xl font-semibold text-gray-800'>{stats.total}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100'>
          <CheckCircle className='text-green-500' />
          <div>
            <p className='text-sm text-gray-500'>Completed</p>
            <p className='text-xl font-semibold text-gray-800'>{stats.completed}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100'>
          <Clock className='text-amber-500' />
          <div>
            <p className='text-sm text-gray-500'>Pending</p>
            <p className='text-xl font-semibold text-gray-800'>{stats.pending}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
