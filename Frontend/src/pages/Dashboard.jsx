import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Calendar, CheckSquare, ClipboardList, RefreshCw } from 'lucide-react'

const statusClass = (completed) =>
  completed
    ? 'text-green-600 bg-green-50 border-green-100'
    : 'text-amber-600 bg-amber-50 border-amber-100'

function Dashboard() {
  const { tasks = [], fetchTasks } = useOutletContext()

  if (!tasks.length) {
    return (
      <div className='bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center shadow-sm'>
        <ClipboardList className='w-12 h-12 mx-auto text-purple-400 mb-4' />
        <p className='text-lg font-semibold text-gray-800 mb-2'>No tasks yet</p>
        <p className='text-sm text-gray-500 mb-4'>Create your first task to see it here.</p>
        <button
          onClick={fetchTasks}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors'
        >
          <RefreshCw className='w-4 h-4' />
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100'>
        <div className='flex items-center gap-2 text-gray-800 font-semibold'>
          <ClipboardList className='w-5 h-5 text-purple-500' />
          Recent Tasks
        </div>
        <button
          onClick={fetchTasks}
          className='inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium'
        >
          <RefreshCw className='w-4 h-4' />
          Refresh
        </button>
      </div>
      <ul className='divide-y divide-gray-100'>
        {tasks.map((task) => (
          <li key={task._id} className='p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='flex-1 min-w-0'>
              <p className='text-base font-semibold text-gray-900 truncate'>{task.title}</p>
              {task.description && (
                <p className='text-sm text-gray-500 line-clamp-2'>{task.description}</p>
              )}
              <div className='flex flex-wrap gap-3 mt-3 text-sm text-gray-500'>
                {task.priority && (
                  <span className='inline-flex items-center gap-1'>
                    <CheckSquare className='w-4 h-4 text-purple-500' />
                    {task.priority}
                  </span>
                )}
                {task.dueDate && (
                  <span className='inline-flex items-center gap-1'>
                    <Calendar className='w-4 h-4 text-purple-500' />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${statusClass(
                task.completed
              )}`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
