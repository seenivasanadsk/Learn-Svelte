<script>
  import { env } from '$env/dynamic/public';
  import { goto } from '$app/navigation';

  // Core Lucide icons
  import {
    Icon,
    Ticket,
    Clock,
    Wallet,
    FileBarChart,
    BookOpen,
    Scale,
    Settings,
    ClipboardList,
    Truck,
    Car,
    MapPin,
    Tags,
    List,
    Handshake,
    Users,
    CircleUser
  } from 'lucide-svelte';

  // Lab Lucide icons
  import { steeringWheel } from '@lucide/lab';
  import { hatHard } from '@lucide/lab';

  // Menu array
  const menus = [
    { label: 'Orders', icon: Truck, route: '/orders' },
    { label: 'Waiting List', icon: Clock, route: '/waiting-list' },
    { label: 'Tokens', icon: Ticket, route: '/tokens' },
    { label: 'Delivery Sheet', icon: ClipboardList, route: '/delivery' },
    { label: 'Cash Report', icon: Wallet, route: '/cash-report' },
    { label: 'Balance Sheet', icon: FileBarChart, route: '/balance-sheet' },
    { label: 'Ledger', icon: BookOpen, route: '/ledger' },
    { label: 'Weighment', icon: Scale, route: '/weighment' },

    // ✅ Drivers uses Lab icon
    { label: 'Drivers', icon: steeringWheel, type: 'lab', route: '/drivers' },
    { label: 'Workers', icon: hatHard, type: 'lab', route: '/worker' },

    { label: 'Vehicles', icon: Car, route: '/vehicles' },
    { label: 'Address', icon: MapPin, route: '/addresses' },
    { label: 'Price', icon: Tags, route: '/pricing' },
    { label: 'Materials', icon: List, route: '/materials' },
    { label: 'Party', icon: Users, route: '/party' },
    { label: 'User', icon: CircleUser, route: '/party' },
    { label: 'Settings', icon: Settings, route: '/settings' }
  ];
</script>

<div
  class="h-full flex flex-col items-center text-center font-semibold px-4 overflow-auto py-10 md:py-20"
>
  <!-- Title -->
  <h1
    class="bg-linear-to-r from-amber-300 via-amber-500 to-orange-600
           bg-clip-text text-transparent
           text-3xl md:text-5xl font-extrabold tracking-tight"
  >
    {env.PUBLIC_COMPANY_NAME}
  </h1>

  <!-- Subtitle -->
  <p class="mt-3 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-md">
    Manage accounts with
    <span class="text-amber-600 font-semibold">simple</span> and
    <span class="text-amber-600 font-semibold">easy</span> workflows
  </p>

  <!-- Menu -->
  <div class="mt-8 flex flex-wrap justify-center gap-3 w-full max-w-4xl">
    {#each menus as menu, index}
      <button
        on:click={() => goto(menu.route)}
        class="flex flex-col items-center justify-center relative
               rounded-md border-2 border-amber-400/70
               p-2 w-28 h-28 overflow-hidden
               backdrop-blur
               transition-all duration-200
               active:scale-95
               focus:outline-none"
      >
        <!-- Index Badge -->
        <span class="absolute top-0 left-0 text-xs opacity-50 p-1">{index + 1}</span>

        <!-- Icon -->
        <div
          class="mb-1 flex h-10 w-10 items-center justify-center
                 rounded-lg
                 bg-amber-100 dark:bg-amber-900
                 text-amber-600 dark:text-amber-400"
        >
          {#if menu.type === 'lab'}
            <!-- LAB icon -->
            <Icon iconNode={menu.icon} size={22} strokeWidth={1.8} />
          {:else}
            <!-- Normal Lucide icon -->
            <svelte:component this={menu.icon} size={22} strokeWidth={1.8} />
          {/if}
        </div>

        <!-- Label -->
        <span
          class="text-sm text-gray-800 dark:text-gray-200
                 text-center leading-tight
                 line-clamp-2"
        >
          {menu.label}
        </span>
      </button>
    {/each}
  </div>
</div>
