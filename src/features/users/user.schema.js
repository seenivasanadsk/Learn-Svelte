import { z } from 'zod'

export const USER_ROLES = ['Admin', 'Manager'];

// Main user schema
export const userSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }).max(25, { message: 'Username must be less than 25 characters' }),

  password: z.string()
    .min(3, { message: 'Password must be greater than 3 characters' })
    .max(20, { message: 'Password must be less than 20 characters' })
    .optional(),

  role: z.enum(USER_ROLES, {
    errorMap: () => ({
      message: `Role must be one of: ${USER_ROLES.join(', ')}`
    })
  }),

  isActive: z.boolean().optional(),

  settings: z.object({
    theme: z.enum(['light', 'dark', 'system'], {
      errorMap: () => ({ message: 'Theme must be one of: light, dark, system' })
    })
  }).strict().optional()
})
