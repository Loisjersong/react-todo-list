import { test, expect } from '@playwright/test';

test.describe('Todo List Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should add and manage simple todos', async ({ page }) => {
    // Add initial todo
    const firstTodoInput = page.locator('input[placeholder="Task Name"]').first();
    await firstTodoInput.fill('First Task');
    await page.getByTestId('add-initial-todo').click();
    
    // Add another todo
    const secondTodoInput = page.locator('input[placeholder="Task Name"]').nth(1);
    await secondTodoInput.fill('Second Task');
    
    // Verify todos exist
    const todoInputs = await page.locator('input[placeholder="Task Name"]').all();
    expect(todoInputs).toHaveLength(3); // 2 simple + 1 detailed
    
    // Delete a todo
    await page.getByTestId('delete-todo-0').click();
    const updatedTodoInputs = await page.locator('input[placeholder="Task Name"]').all();
    expect(updatedTodoInputs).toHaveLength(2);
  });

  test('should add and manage detailed todos', async ({ page }) => {
    // Add initial detailed todo
    const taskInput = page.locator('input[placeholder="Task Name"]').nth(1);
    const descInput = page.locator('input[placeholder="Description"]').first();
    
    await taskInput.fill('Detailed Task');
    await descInput.fill('Task Description');
    await page.getByTestId('add-initial-detailed').click();
    
    // Verify new detailed todo is added
    const taskInputs = await page.locator('input[placeholder="Task Name"]').all();
    const descInputs = await page.locator('input[placeholder="Description"]').all();
    expect(taskInputs).toHaveLength(3);
    expect(descInputs).toHaveLength(2);
    
    // Delete detailed todo
    await page.getByTestId('delete-detailed-0').click();
    expect(await page.locator('input[placeholder="Task Name"]').all()).toHaveLength(2);
    expect(await page.locator('input[placeholder="Description"]').all()).toHaveLength(1);
  });

  test('should show error messages for empty submissions', async ({ page }) => {
    // Click submit button using role
    await page.getByRole('button', { name: 'ADD FORM' }).click();
    
    // Verify error messages
    const todoError = page.getByTestId('todo-error');
    const detailedError = page.getByTestId('detailed-todo-error');
    
    await expect(todoError).toBeVisible();
    await expect(detailedError).toBeVisible();
    await expect(todoError).toHaveText('TODO LIST has empty values');
    await expect(detailedError).toHaveText('TODO LIST with Description has empty values');
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    // Fill simple todo
    const simpleTodoInput = page.locator('input[placeholder="Task Name"]').first();
    await simpleTodoInput.fill('Simple Task');
    
    // Fill detailed todo - updated selectors
    const detailedTaskInput = page.locator('input[placeholder="Task Name"]').last(); // Changed from nth(1) to last()
    const detailedDescInput = page.locator('input[placeholder="Description"]').first();
    await detailedTaskInput.fill('Detailed Task');
    await detailedDescInput.fill('Task Description');
    
    // Submit form using role
    await page.getByRole('button', { name: 'ADD FORM' }).click();
    
    // Verify success toast
    const toast = page.getByText('Form submitted successfully!')
    await expect(toast).toBeVisible();
  });
});