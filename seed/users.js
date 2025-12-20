import { redText } from '../commands/helpers/formatText.js'
import { hashPassword } from '../src/lib/features/auth/password.js'
import { userSchema } from '../src/lib/features/users/user.schema.js'
import { userCreateModel } from '../src/lib/features/users/user.model.js'

const admin = {
  username: process.env.ADMIN_USERNAME || 'Admin',
  password: process.env.ADMIN_PASSWORD || 'Admin@123',
  role: 'Admin'
};

const users = [
  // ...Array(600).fill(admin),
  admin,
  {
    username: 'Guna',
    password: 'Guna@123',
    role: 'Manager'
  },
  {
    username: 'Nataraj',
    password: 'Nataraj@123',
    role: 'Manager'
  },
  {
    username: 'VJ',
    password: 'VJ@123',
    role: 'Manager'
  },
  {
    username: 'Seeni',
    password: 'Seeni@123',
    role: 'Manager'
  },
  {
    username: 'Saravanan',
    password: 'Sara@123',
    role: 'Manager'
  },
  {
    username: 'Ramki',
    password: 'Ramki@123',
    role: 'Manager'
  }
];

export const seedData = await Promise.all(
  users.map(async (u) => {
    u.hashedPassword = await hashPassword(u.password)
    delete u.password
    const isValid = userSchema.safeParse(u)
    if (isValid.success)
      return userCreateModel(u, {}, true)
    else {
      console.log(redText(`Error in User Data ${u.username}`))
      return null
    }
  })
);
