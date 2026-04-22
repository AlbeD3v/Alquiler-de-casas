import { test, expect } from '@playwright/test'

test.describe('Auth - Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('muestra el formulario de login', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /iniciar sesión/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/contraseña/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('muestra error con credenciales inválidas', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalid@example.com')
    await page.getByLabel(/contraseña/i).fill('wrongpassword')
    await page.getByRole('button', { name: /entrar/i }).click()

    await expect(page.getByText(/credenciales inválidas/i)).toBeVisible()
  })

  test('redirige al dashboard después de login exitoso', async ({ page }) => {
    await page.getByLabel(/email/i).fill('user@example.com')
    await page.getByLabel(/contraseña/i).fill('correctpassword')
    await page.getByRole('button', { name: /entrar/i }).click()

    await expect(page).toHaveURL('/dashboard')
  })

  test('tiene link para registrarse', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: /registrarse/i })
    await expect(registerLink).toBeVisible()
    await registerLink.click()
    await expect(page).toHaveURL('/register')
  })
})
