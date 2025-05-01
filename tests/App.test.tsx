import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import App from '../src/App'
import { vi } from 'vitest'
import toast from 'react-hot-toast'

vi.mock('react-hot-toast', () => ({
  success: vi.fn(),
  default: {
    success: vi.fn(),
    error: vi.fn()
  },
  Toaster: vi.fn(() => null)
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial Render', () => {
    it('should render both todo lists', () => {
      render(<App />)
      expect(screen.getByText('TODO LIST')).toBeInTheDocument()
      expect(screen.getByText('TODO LIST with Description')).toBeInTheDocument()
    })

    it('should render initial empty inputs', () => {
      render(<App />)
      const inputs = screen.getAllByPlaceholderText('Task Name')
      const descriptionInput = screen.getByPlaceholderText('Description')
      expect(inputs).toHaveLength(2)
      expect(descriptionInput).toBeInTheDocument()
    })
  })

  describe('Simple Todo List', () => {
    it('should add a new todo when clicking + button', async () => {
      render(<App />)
      await act(async () => {
        const input = screen.getAllByPlaceholderText('Task Name')[0]
        const addButton = screen.getByTestId('add-initial-todo')

        await userEvent.type(input, 'Test Todo')
        await userEvent.click(addButton)
      })

      expect(screen.getAllByPlaceholderText('Task Name')).toHaveLength(3)
    })

    it('should delete a todo when clicking delete button', async () => {
      render(<App />)
      await act(async () => {
        const input = screen.getAllByPlaceholderText('Task Name')[0]
        const addButton = screen.getByTestId('add-initial-todo')
  
        await userEvent.type(input, 'Test Todo')
        await userEvent.click(addButton)
      })
  
      expect(screen.getAllByPlaceholderText('Task Name')).toHaveLength(3)
  
      await act(async () => {
        const deleteButton = screen.getByTestId('delete-todo-0')
        await userEvent.click(deleteButton)
      })
  
      
      expect(screen.getAllByPlaceholderText('Task Name')).toHaveLength(2)
    })
  })

  describe('Detailed Todo List', () => {
    it('should add a new detailed todo when clicking + button', async () => {
      render(<App />)
      
      await act(async () => {
        const taskInput = screen.getAllByPlaceholderText('Task Name')[1]
        const descriptionInput = screen.getByPlaceholderText('Description')
        const addButton = screen.getByTestId('add-initial-detailed')
    
        await userEvent.type(taskInput, 'Test Task')
        await userEvent.type(descriptionInput, 'Test Description')
        await userEvent.click(addButton)
      })
    
      const taskInputs = screen.getAllByPlaceholderText('Task Name')
      const descInputs = screen.getAllByPlaceholderText('Description')
      expect(taskInputs).toHaveLength(3)
      expect(descInputs).toHaveLength(2)
    })

    it('should delete a detailed todo when clicking delete button', async () => {
      render(<App />)
      
      await act(async () => {
        const taskInput = screen.getAllByPlaceholderText('Task Name')[1]
        const descriptionInput = screen.getByPlaceholderText('Description')
        const addButton = screen.getByTestId('add-initial-detailed')
    
        await userEvent.type(taskInput, 'Test Task')
        await userEvent.type(descriptionInput, 'Test Description')
        await userEvent.click(addButton)
    
        const deleteButton = screen.getByTestId('delete-detailed-0')
        await userEvent.click(deleteButton)
      })
    
      const taskInputs = screen.getAllByPlaceholderText('Task Name')
      const descInputs = screen.getAllByPlaceholderText('Description')
      expect(taskInputs).toHaveLength(2)
      expect(descInputs).toHaveLength(1)
    })

  describe('Form Submission', () => {
    it('should show success toast when submitting with valid values', async () => {
      render(<App />)
      
      await act(async () => {
        // Add and fill simple todo
        const simpleInput = screen.getAllByPlaceholderText('Task Name')[0]
        await userEvent.type(simpleInput, 'Simple Todo')
        await userEvent.click(screen.getByTestId('add-initial-todo'))
        
        // Fill the newly added simple todo
        const newSimpleInput = screen.getAllByPlaceholderText('Task Name')[1]
        await userEvent.type(newSimpleInput, 'Another Simple Todo')
        
        // Add and fill detailed todo
        const taskInput = screen.getAllByPlaceholderText('Task Name')[2] // Index changed due to new simple todo
        const descriptionInput = screen.getByPlaceholderText('Description')
        await userEvent.type(taskInput, 'Test Task')
        await userEvent.type(descriptionInput, 'Test Description')
        await userEvent.click(screen.getByTestId('add-initial-detailed'))
        
        // Fill the newly added detailed todo
        const newTaskInput = screen.getAllByPlaceholderText('Task Name')[3]
        const newDescInput = screen.getAllByPlaceholderText('Description')[1]
        await userEvent.type(newTaskInput, 'Another Test Task')
        await userEvent.type(newDescInput, 'Another Test Description')
  
        // Submit form
        const submitButton = screen.getByText('ADD FORM')
        await userEvent.click(submitButton)
      })
  
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Form submitted successfully!',
          expect.any(Object)
        )
      })
    })
  }) })

  describe('Add Todo List Button', () => {
    it('should add new todo input when clicking Add TODO LIST button', async () => {
      render(<App />)
      
      await act(async () => {
        const simpleInput = screen.getAllByPlaceholderText('Task Name')[0]
        const taskInput = screen.getAllByPlaceholderText('Task Name')[1]
        const descriptionInput = screen.getByPlaceholderText('Description')
        const plusButtons = screen.getAllByText('+')
    
        await userEvent.type(simpleInput, 'Simple Todo')
        await userEvent.click(plusButtons[0])
        await userEvent.type(taskInput, 'Test Task')
        await userEvent.type(descriptionInput, 'Test Description')
        await userEvent.click(plusButtons[1])
    
        const addButtons = screen.getAllByText('Add TODO LIST')
        await userEvent.click(addButtons[0])
        await userEvent.click(addButtons[1])
      })
    
      expect(screen.getAllByPlaceholderText('Task Name')).toHaveLength(4)
      expect(screen.getAllByPlaceholderText('Description')).toHaveLength(2)
    })
  })
})