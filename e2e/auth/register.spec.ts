import { test, expect } from '@playwright/test'

test.describe('Auth - Registro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('muestra el formulario de registro', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /crear cuenta/i })).toBeVisible()
    await expect(page.getByLabel(/nombre/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/contraseña/i)).toBeVisible()
    await expect(page.getByLabel(/confirmar contraseña/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /registrarse/i })).toBeVisible()
  })

  test('muestra error cuando las contraseñas no coinciden', async ({ page }) => {
    await page.getByLabel(/nombre/i).fill('Juan Pérez')
    await page.getByLabel(/email/i).fill('juan@example.com')
    await page.getByLabel(/contraseña/i).fill('password123')
    await page.getByLabel(/confirmar contraseña/i).fill('differentpassword')
    await page.getByRole('button', { name: /registrarse/i }).click()

    await expect(page.getByText(/las contraseñas no coinciden/i)).toBeVisible()
  })

  test('muestra error con email ya registrado', async ({ page }) => {
    await page.getByLabel(/nombre/i).fill('Juan Pérez')
    await page.getByLabel(/email/i).fill('existing@example.com')
    await page.getByLabel(/contraseña/i).fill('password123')
    await page.getByLabel(/confirmar contraseña/i).fill('password123')
    await page.getByRole('button', { name: /registrarse/i }).click()

    await expect(page.getByText(/email ya registrado/i)).toBeVisible()
  })

  test('redirige al login después de registro exitoso', async ({ page }) => {
    await page.getByLabel(/nombre/i).fill('Nuevo Usuario')
    await page.getByLabel(/email/i).fill(`newuser${Date.now()}@example.com`)
    await page.getByLabel(/contraseña/i).fill('password123')
    await page.getByLabel(/confirmar contraseña/i).fill('password123')
    await page.getByRole('button', { name: /registrarse/i }).click()

    await expect(page).toHaveURL('/login')
    await expect(page.getByText(/cuenta creada exitosamente/i)).toBeVisible()
  })

  test('tiene link para iniciar sesión', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /iniciar sesión/i })
    await expect(loginLink).toBeVisible()
    await loginLink.click()
    await expect(page).toHaveURL('/login')
  })
})
