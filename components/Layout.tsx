
import React, { useState, Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from './icons';
import { cn } from '../utils/cn';
import { Transition, Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

const getNavLinks = (role) => {
  const baseLinks = [
    { to: '/dashboard', icon: Icons.dashboard, label: 'ダッシュボード' },
    { to: '/lessons', icon: Icons.lessons, label: 'レッスン' },
    { to: '/community', icon: Icons.community, label: 'コミュニティ' },
  ];

  if (role === 'student') {
    return [
      ...baseLinks,
      { to: '/booking', icon: Icons.calendar, label: '予約' },
      { to: '/practice', icon: Icons.practice, label: '練習記録' },
    ];
  }
  if (role === 'instructor') {
    return baseLinks;
  }
  if (role === 'admin') {
    return [
      { to: '/dashboard', icon: Icons.dashboard, label: 'ダッシュボード' },
      { to: '/students', icon: Icons.students, label: '生徒' },
      { to: '/instructors', icon: Icons.instructors, label: '講師' },
      { to: '/lessons', icon: Icons.lessons, label: '全レッスン' },
    ];
  }
  return [];
};


const SidebarContent = ({ onLinkClick }) => {
    const { user, logout } = useAuth();

    if (!user) return null;
    const navLinks = getNavLinks(user.role);

    return (
        <div className="flex h-full flex-col bg-black text-white">
            <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-800">
                <Icons.guitar className="h-8 w-8 text-white" />
                <span className="ml-3 text-xl font-semibold">ハルモ音楽教室</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            )
                        }
                    >
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto border-t border-gray-800 p-4">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full"/>
                        <div>
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                     </div>
                    <button onClick={logout} className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                        <Icons.logout className="h-5 w-5" />
                    </button>
                 </div>
            </div>
        </div>
    );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Mobile sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">サイドバーを閉じる</span>
                                        <Icons.logout className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                                <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <SidebarContent onLinkClick={() => {}}/>
            </div>

            <div className="lg:pl-64">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">サイドバーを開く</span>
                        <Icons.dashboard className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="h-6 w-px bg-slate-200 lg:hidden" aria-hidden="true" />
                    <div className="flex flex-1 justify-end items-center">
                        {/* Header can contain more items like notifications, etc. */}
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                      <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {children}
                      </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
};
