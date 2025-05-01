import { useState } from 'react'
import './App.css'
import {
  DetailedTodo,
  TodoHandlers,
  handleAddInitialTodo,
  handleAddAnotherTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  handleAddDetailedTodo,
  handleAddAnotherDetailedTodo,
  handleDeleteDetailedTodo,
  handleUpdateDetailedTodo
} from './todoHandlers'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [todos, setTodos] = useState<string[]>([''])
  const [inputValue, setInputValue] = useState('')
  const [detailedTodos, setDetailedTodos] = useState<DetailedTodo[]>([{ task: '', description: '' }])
  const [detailedInput, setDetailedInput] = useState<DetailedTodo>({ task: '', description: '' })
  const [showErrors, setShowErrors] = useState(false)
  
  const handlers: TodoHandlers = {
    todos,
    setTodos,
    inputValue,
    setInputValue,
    detailedTodos,
    setDetailedTodos,
    detailedInput,
    setDetailedInput
  }

  const hasEmptyTodos = () => {
    if (todos.length === 1 && todos[0] === '') {
      return inputValue.trim() === '';
    }
    return todos.some(todo => todo.trim() === '');
  }

  const hasEmptyDetailedTodos = () => {
    if (detailedTodos.length === 1 && 
        detailedTodos[0].task === '' && 
        detailedTodos[0].description === '') {
      return detailedInput.task.trim() === '' || detailedInput.description.trim() === '';
    }
    return detailedTodos.some(todo => 
      todo.task.trim() === '' || todo.description.trim() === ''
    );
  }

  const handleSubmit = () => {
    setShowErrors(true)
    if (!hasEmptyTodos() && !hasEmptyDetailedTodos()) {
      toast.success('Form submitted successfully!', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#00a67d',
          color: '#fff',
        },
      })
    }
  }

  return (
    <div className='max-w-xl mx-auto px-4'>
      <Toaster />
      <div className="shadow-lg px-4 pb-4">
        <h1 className='text-3xl font-bold mb-15'>Add FORM</h1>

        <div className='mt-4'>
          <h2>TODO LIST</h2>
          <div className="border-l-3 border-gray-300 p-2 ml-6">
            <p className="pb-1">Task Name</p>

            {todos.map((todo, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input 
                className="shadow appearance-none border rounded-lg py-1 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                value={todos.length === 1 && index === 0 ? inputValue : todo}
                onChange={(e) => 
                  todos.length === 1 && index === 0 
                    ? setInputValue(e.target.value)
                    : handleUpdateTodo(handlers, index, e.target.value)
                }
                placeholder="Task Name"
              />
              <button 
                data-testid={todos.length === 1 && index === 0 ? 'add-initial-todo' : `delete-todo-${index}`}
                className={`w-10 h-8 rounded flex items-center justify-center ${
                  todos.length === 1 && index === 0
                    ? 'bg-gray-300 hover:bg-gray-400'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                onClick={() => 
                  todos.length === 1 && index === 0
                    ? handleAddInitialTodo(handlers)
                    : handleDeleteTodo(handlers, index)
                }
              >
                <span className={`${todos.length === 1 && index === 0 ? 'text-4xl' : 'text-3xl'} leading-none -mt-1.5 font-light`}>
                  {todos.length === 1 && index === 0 ? '+' : '×'}
                </span>
              </button>
            </div>
          ))}

            <div className="flex justify-end">
              <button 
                className="w-36 h-6 bg-emerald-600 text-sm font-bold rounded flex items-center justify-around mt-2 hover:bg-emerald-700 text-white"
                onClick={() => handleAddAnotherTodo(handlers)}
              >
                <span className='text-3xl leading-none -mt-1.5 font-light'>+</span> Add TODO LIST
              </button>               
            </div>
          </div>
        </div>
        
        {/* TODO LIST with Description */}
        <div className='mt-4'>
          <h2>TODO LIST with Description</h2>
          <div className="border-l-3 border-gray-300 p-2 ml-6">
            <p className="pb-1">Task Details</p>

            {detailedTodos.map((todo, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <input 
                  className="shadow appearance-none border rounded-lg py-1 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="text" 
                  value={detailedTodos.length === 1 && index === 0 ? detailedInput.task : todo.task}
                  onChange={(e) => 
                    detailedTodos.length === 1 && index === 0 
                      ? setDetailedInput({...detailedInput, task: e.target.value})
                      : handleUpdateDetailedTodo(handlers, index, 'task', e.target.value)
                  }
                  placeholder="Task Name"
                />
                <input
                  className="shadow appearance-none border rounded-lg py-1 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={detailedTodos.length === 1 && index === 0 ? detailedInput.description : todo.description}
                  onChange={(e) => 
                    detailedTodos.length === 1 && index === 0 
                      ? setDetailedInput({...detailedInput, description: e.target.value})
                      : handleUpdateDetailedTodo(handlers, index, 'description', e.target.value)
                  }
                  placeholder="Description"
                />
                <button 
                  data-testid={detailedTodos.length === 1 && index === 0 ? 'add-initial-detailed' : `delete-detailed-${index}`}
                  className={`w-10 h-8 rounded flex items-center justify-center px-1.5 ${
                    detailedTodos.length === 1 && index === 0
                      ? 'bg-gray-300 hover:bg-gray-400'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                  onClick={() => 
                    detailedTodos.length === 1 && index === 0
                      ? handleAddDetailedTodo(handlers)
                      : handleDeleteDetailedTodo(handlers, index)
                  }
                >
                  <span className={`${detailedTodos.length === 1 && index === 0 ? 'text-4xl' : 'text-3xl'} leading-none -mt-1.5 font-light`}>
                    {detailedTodos.length === 1 && index === 0 ? '+' : '×'}
                  </span>
                </button>
              </div>
            </div>
          ))}

            <div className="flex justify-end">
              <button 
                className="w-36 h-6 bg-emerald-600 text-sm font-bold rounded flex items-center justify-around mt-2 hover:bg-emerald-700 text-white"
                onClick={() => handleAddAnotherDetailedTodo(handlers)}
              >
                <span className='text-3xl leading-none -mt-1.5 font-light'>+</span> Add TODO LIST
              </button>               
            </div>
          </div>
        </div>

        {/* Error messages */}
        {showErrors && hasEmptyTodos() && (
        <h2 data-testid="todo-error" className="text-red-500 font-bold mt-4">
          TODO LIST has empty values
        </h2>
        )}
        {showErrors && hasEmptyDetailedTodos() && (
        <h2 data-testid="detailed-todo-error" className="text-red-500 font-bold mt-2">
          TODO LIST with Description has empty values
        </h2>
        )}

        <button 
          className='bg-slate-700 hover:bg-slate-800 text-white w-full rounded py-4 font-bold my-5'
          onClick={handleSubmit}
        >
          ADD FORM
        </button>
      </div>
    </div>
  )
}

export default App