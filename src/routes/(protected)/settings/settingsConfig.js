import { CircleUser, Monitor, MoonIcon, User } from "lucide-svelte";

export const iconBg = {
  red: 'bg-red-50 text-red-600 dark:bg-red-900/30',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30',
  gray: 'bg-gray-50 text-gray-600 dark:text-gray-400 dark:bg-gray-700/40',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/30'
};

// {
//   name: '',
//   icon: '',
//   color: '',
//   description: '',
//   key: '', // Swithc Types
//   href: '' // Link Types
// }
export const groupedSettingsConfig = [
  {
    title: 'Personal',
    groupKey: 'personal',
    settings: [
      {
        name: 'Profile',
        icon: CircleUser,
        color: 'blue',
        description: 'Manage your profile',
        href: '/settings/profile'
      },
      {
        name: 'System Theme',
        icon: Monitor,
        color: 'amber',
        description: 'Get default system theme automatically (Dark or Light mode)',
        key: 'personal.theme.system'
      },
      {
        name: 'Dark Mode',
        icon: MoonIcon,
        color: 'amber',
        description: 'Turn on Dark mode',
        key: 'personal.theme.dark'
      }
    ]
  },
  {
    title: 'Global',
    groupKey: 'global',
    settings: [
      {
        name: 'Manage Users',
        icon: User,
        color: 'blue',
        description: 'Manage users who used this application',
        href: '/settings/users'
      }
    ]
  }
];