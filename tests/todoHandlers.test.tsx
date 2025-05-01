import {
  TodoHandlers,
  DetailedTodo,
  handleAddInitialTodo,
  handleAddAnotherTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  handleAddDetailedTodo,
  handleAddAnotherDetailedTodo,
  handleDeleteDetailedTodo,
  handleUpdateDetailedTodo
} from '../src/todoHandlers'

describe('Todo Handlers', () => {
  let mockHandlers: TodoHandlers

  beforeEach(() => {
    mockHandlers = {
      todos: [''],
      setTodos: vi.fn(),
      inputValue: '',
      setInputValue: vi.fn(),
      detailedTodos: [{ task: '', description: '' }],
      setDetailedTodos: vi.fn(),
      detailedInput: { task: '', description: '' },
      setDetailedInput: vi.fn()
    }
  })

  describe('handleAddInitialTodo', () => {
    it('should not add empty todo', () => {
      handleAddInitialTodo(mockHandlers)
      expect(mockHandlers.setTodos).not.toHaveBeenCalled()
    })

    it('should add initial todo and clear input', () => {
      mockHandlers.inputValue = 'Test Todo'
      handleAddInitialTodo(mockHandlers)
      expect(mockHandlers.setTodos).toHaveBeenCalledWith(['Test Todo', ''])
      expect(mockHandlers.setInputValue).toHaveBeenCalledWith('')
    })
  })

  describe('handleAddAnotherTodo', () => {
    it('should add new todo when in initial state', () => {
      mockHandlers.inputValue = 'Test Todo'
      mockHandlers.todos = ['']
      handleAddAnotherTodo(mockHandlers)
      expect(mockHandlers.setTodos).toHaveBeenCalledWith(['Test Todo', ''])
    })

    it('should add empty todo when not in initial state', () => {
      mockHandlers.todos = ['Existing Todo']
      handleAddAnotherTodo(mockHandlers)
      expect(mockHandlers.setTodos).toHaveBeenCalledWith(['Existing Todo', ''])
    })
  })

  describe('handleDeleteTodo', () => {
    it('should delete todo at specified index', () => {
      mockHandlers.todos = ['Todo 1', 'Todo 2']
      handleDeleteTodo(mockHandlers, 0)
      expect(mockHandlers.setTodos).toHaveBeenCalledWith(['Todo 2'])
    })

    it('should reset to initial state when deleting last todo', () => {
      mockHandlers.todos = ['Todo']
      handleDeleteTodo(mockHandlers, 0)
      expect(mockHandlers.setTodos).toHaveBeenCalledWith([''])
    })
  })

  describe('handleUpdateTodo', () => {
    it('should update todo at specified index', () => {
      mockHandlers.todos = ['Todo 1', 'Todo 2']
      handleUpdateTodo(mockHandlers, 1, 'Updated Todo')
      expect(mockHandlers.setTodos).toHaveBeenCalledWith(['Todo 1', 'Updated Todo'])
    })
  })

  describe('handleAddDetailedTodo', () => {
    it('should not add empty detailed todo', () => {
      handleAddDetailedTodo(mockHandlers)
      expect(mockHandlers.setDetailedTodos).not.toHaveBeenCalled()
    })

    it('should add detailed todo and clear input', () => {
      mockHandlers.detailedInput = { task: 'Test Task', description: 'Test Description' }
      handleAddDetailedTodo(mockHandlers)
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Test Task', description: 'Test Description' },
        { task: '', description: '' }
      ])
      expect(mockHandlers.setDetailedInput).toHaveBeenCalledWith({ task: '', description: '' })
    })
  })

  describe('handleAddAnotherDetailedTodo', () => {
    it('should add new detailed todo when in initial state', () => {
      mockHandlers.detailedInput = { task: 'Test Task', description: 'Test Description' }
      mockHandlers.detailedTodos = [{ task: '', description: '' }]
      handleAddAnotherDetailedTodo(mockHandlers)
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Test Task', description: 'Test Description' },
        { task: '', description: '' }
      ])
    })

    it('should add empty detailed todo when not in initial state', () => {
      mockHandlers.detailedTodos = [{ task: 'Existing Task', description: 'Existing Description' }]
      handleAddAnotherDetailedTodo(mockHandlers)
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Existing Task', description: 'Existing Description' },
        { task: '', description: '' }
      ])
    })
  })

  describe('handleDeleteDetailedTodo', () => {
    it('should delete detailed todo at specified index', () => {
      mockHandlers.detailedTodos = [
        { task: 'Task 1', description: 'Description 1' },
        { task: 'Task 2', description: 'Description 2' }
      ]
      handleDeleteDetailedTodo(mockHandlers, 0)
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Task 2', description: 'Description 2' }
      ])
    })

    it('should reset to initial state when deleting last detailed todo', () => {
      mockHandlers.detailedTodos = [{ task: 'Task', description: 'Description' }]
      handleDeleteDetailedTodo(mockHandlers, 0)
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([{ task: '', description: '' }])
    })
  })

  describe('handleUpdateDetailedTodo', () => {
    it('should update task field of detailed todo', () => {
      mockHandlers.detailedTodos = [{ task: 'Task', description: 'Description' }]
      handleUpdateDetailedTodo(mockHandlers, 0, 'task', 'Updated Task')
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Updated Task', description: 'Description' }
      ])
    })

    it('should update description field of detailed todo', () => {
      mockHandlers.detailedTodos = [{ task: 'Task', description: 'Description' }]
      handleUpdateDetailedTodo(mockHandlers, 0, 'description', 'Updated Description')
      expect(mockHandlers.setDetailedTodos).toHaveBeenCalledWith([
        { task: 'Task', description: 'Updated Description' }
      ])
    })
  })
})