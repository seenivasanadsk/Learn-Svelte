import { hashPassword } from '../src/features/auth/password.js';
import { defualtSettings } from '../config/constant.js';

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
  users.map(async (u) => ({
    username: u.username,
    hashed_password: await hashPassword(u.password),
    role: u.role,
    lastLogin: null,
    lastAccess: null,
    lastPasswordReset: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    seededAt: new Date(),
    isActive: true,
    settings: defualtSettings
  }))
);
