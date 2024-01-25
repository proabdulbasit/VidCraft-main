'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Grid } from '@nextui-org/react';
import supabase from '@/services/supabase/client';
import { getSubscription } from '@/app/supabase-server';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/');
  const [isActive, setIsActive] = useState('');

  const router = useRouter();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  const [session, setSession] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((savedSession) => {
      if (savedSession && !savedSession.error && savedSession.data.session) {
        setSession(savedSession.data.session);
        console.log(savedSession.data.session);
        setUser(savedSession.data.session.user);
        sessionStorage.setItem('UID', savedSession.data.session.user.id);
        console.log(savedSession.data.session.user);
      }
    });
  }, []);

  const handleLinkClick = async (route) => {
    if (route === '/create-videos') {
      const sub = await getSubscription(user.id);
      if (sub === null) {
        setActiveRoute('/pricing');
        router.push('/pricing');
      } else {
        handleRouteChange(route);
      }
    } else {
      handleRouteChange(route);
    }
  };

  const handleRouteChange = (route) => {
    setActiveRoute(route);
    if (route === activeRoute) {
      console.log('route', activeRoute);
      setIsActive('text-blue-600 font-bold');
    } else {
      setIsActive('text-gray-500');
    }
  };

  const [menuVisible, setMenuVisibility] = useState(false);

  const handleMenuVisibility = () => {
    setMenuVisibility(!menuVisible);
  };

  async function signout() {
    console.log('signout');
    await supabase.auth.signOut();
    sessionStorage.clear();
    setSession(null);
    setUser(null);
    location.reload();
  }

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className='relative bg-white border-b-2'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-12  border-gray-100'>
            <div className='col-span-2 p-2'>
              <a href='#'>
                <span className='sr-only'>Workflow</span>
                <img
                  className='h-8 w-auto sm:h-10'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                  alt=''
                />
              </a>
            </div>
            <div className='col-span-8 p-2 flex justify-center items-center'>
              <nav className='hidden md:flex space-x-10 justify-center items-center'>
                <Link
                  href='/home'
                  className={`text-base font-medium ${
                    activeRoute === '/home' ? 'text-blue-600' : 'text-gray-500'
                  } hover:text-gray-900`}
                  onClick={() => handleLinkClick('/home')}
                >
                  Home
                </Link>
                <Link
                  href='/pricing'
                  className={`text-base font-medium ${
                    activeRoute === '/pricing'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  } hover:text-gray-900`}
                  onClick={() => handleLinkClick('/pricing')}
                >
                  Pricing
                </Link>
                <Link
                  href={user == null ? '/login' : '/create-videos'}
                  className={`text-base font-medium ${
                    activeRoute === '/create-videos'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  } hover:text-gray-900`}
                  onClick={() => handleLinkClick('/create-videos')}
                >
                  Create Videos
                </Link>
              </nav>
            </div>
            <div className='col-span-2 p-2 flex justify-end items-center'>
              <div className='-mr-2 -my-2 md:hidden'>
                <button
                  type='button'
                  className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                  onClick={() => setOpen(!open)}
                >
                  <span className='sr-only'>Open menu</span>
                  {/* Heroicon name: outline/menu */}
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>

              {session && user && (
                <div className='relative inline-block text-left'>
                  <button onClick={handleMenuVisibility}>
                    <img
                      src={user.user_metadata.avatar_url}
                      className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                      aria-hidden='true'
                    />
                  </button>

                  {menuVisible && (
                    <div
                      className='absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='menu-button'
                      tabindex='-1'
                    >
                      <div className='py-1' role='none'>
                        <a
                          href='/profile'
                          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer'
                          role='menuitem'
                          tabindex='-1'
                          id='menu-item-0'
                        >
                          Profile
                        </a>
                        {/* <a
                          href='#'
                          className='text-gray-700 block px-4 py-2 text-sm'
                          role='menuitem'
                          tabindex='-1'
                          id='menu-item-1'
                        >
                          Support
                        </a>
                        <a
                          href='#'
                          className='text-gray-700 block px-4 py-2 text-sm'
                          role='menuitem'
                          tabindex='-1'
                          id='menu-item-2'
                        >
                          License
                        </a> */}
                        <form method='POST' action='#' role='none'>
                          <button
                            type='submit'
                            className='text-red-700 block w-full px-4 py-2 text-left text-sm'
                            role='menuitem'
                            tabindex='-1'
                            id='menu-item-3'
                            onClick={signout}
                          >
                            Sign out
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!session && (
                <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
                  {/* <a
                    onClick={signInWithGoogle}
                    className='whitespace-nowrap text-base font-medium text-gray-500 cursor-pointer hover:text-gray-900'
                  >
                    Login
                  </a> */}
                  {/* <a
                href="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a> */}
                  <div className='ml-6'>
                    <Button
                      auto
                      color='primary'
                      rounded
                      flat
                      onClick={signInWithGoogle}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
        From: ""
        To: ""
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    */}

        <div
          className={
            open
              ? 'opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              : 'opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
          }
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='-mr-2'>
                  <button
                    type='button'
                    className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                    onClick={() => setOpen(!open)}
                  >
                    <span className='sr-only'>Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Features
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Pricing
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Create Videos
                    </span>
                  </a>
                  {/* <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Integrations
                    </span>
                  </a>
                  <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Automations
                    </span>
                  </a> */}
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Pricing
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Docs
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Enterprise
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Blog
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Help Center
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Guides
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Security
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Events
                </a>
              </div>
              <div>
                <a
                  href='signup'
                  className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Sign up
                </a>

                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing customer?
                  <a
                    href='/login'
                    className='text-indigo-600 hover:text-indigo-500 cursor-pointer'
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
