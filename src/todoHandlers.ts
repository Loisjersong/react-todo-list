import { SetStateAction, Dispatch } from 'react'

export interface DetailedTodo {
  task: string
  description: string
}

export interface TodoHandlers {
  todos: string[]
  setTodos: Dispatch<SetStateAction<string[]>>
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  detailedTodos: DetailedTodo[]
  setDetailedTodos: Dispatch<SetStateAction<DetailedTodo[]>>
  detailedInput: DetailedTodo
  setDetailedInput: Dispatch<SetStateAction<DetailedTodo>>
}

export const handleAddInitialTodo = (handlers: TodoHandlers) => {
  const { todos, setTodos, inputValue, setInputValue } = handlers
  if (inputValue.trim()) {
    const nonEmptyTodos = todos.filter(todo => todo !== '')
    setTodos([...nonEmptyTodos, inputValue.trim(), ''])
    setInputValue('')
  }
}

export const handleAddAnotherTodo = (handlers: TodoHandlers) => {
  const { todos, setTodos, inputValue, setInputValue } = handlers
  if (todos.length === 1 && todos[0] === '') {
    if (inputValue.trim()) {
      setTodos([inputValue.trim(), ''])
      setInputValue('')
    }
  } else {
    const nonEmptyTodos = todos.filter(todo => todo.trim() !== '')
    setTodos([...nonEmptyTodos, ''])
  }
}

export const handleDeleteTodo = (handlers: TodoHandlers, index: number) => {
  const { todos, setTodos } = handlers
  setTodos(todos.filter((_, i) => i !== index))
  if (todos.length === 1) {
    setTodos([''])
  }
}

export const handleUpdateTodo = (handlers: TodoHandlers, index: number, value: string) => {
  const { todos, setTodos } = handlers
  const newTodos = [...todos]
  newTodos[index] = value
  setTodos(newTodos)
}

export const handleAddDetailedTodo = (handlers: TodoHandlers) => {
  const { detailedTodos, setDetailedTodos, detailedInput, setDetailedInput } = handlers
  if (detailedInput.task.trim()) {
    const nonEmptyTodos = detailedTodos.filter(todo => todo.task !== '')
    setDetailedTodos([...nonEmptyTodos, {
      task: detailedInput.task.trim(),
      description: detailedInput.description.trim()
    }, { task: '', description: '' }])
    setDetailedInput({ task: '', description: '' })
  }
}

export const handleAddAnotherDetailedTodo = (handlers: TodoHandlers) => {
  const { detailedTodos, setDetailedTodos, detailedInput, setDetailedInput } = handlers
  if (detailedTodos.length === 1 && detailedTodos[0].task === '' && detailedTodos[0].description === '') {
    if (detailedInput.task.trim()) {
      setDetailedTodos([
        {
          task: detailedInput.task.trim(),
          description: detailedInput.description.trim()
        },
        { task: '', description: '' }
      ])
      setDetailedInput({ task: '', description: '' })
    }
  } else {
    const nonEmptyTodos = detailedTodos.filter(todo => todo.task.trim() !== '')
    setDetailedTodos([...nonEmptyTodos, { task: '', description: '' }])
  }
}

export const handleDeleteDetailedTodo = (handlers: TodoHandlers, index: number) => {
  const { detailedTodos, setDetailedTodos } = handlers
  setDetailedTodos(detailedTodos.filter((_, i) => i !== index))
  if (detailedTodos.length === 1) {
    setDetailedTodos([{ task: '', description: '' }])
  }
}

export const handleUpdateDetailedTodo = (
  handlers: TodoHandlers,
  index: number,
  field: keyof DetailedTodo,
  value: string
) => {
  const { detailedTodos, setDetailedTodos } = handlers
  const newTodos = [...detailedTodos]
  newTodos[index][field] = value
  setDetailedTodos(newTodos)
}