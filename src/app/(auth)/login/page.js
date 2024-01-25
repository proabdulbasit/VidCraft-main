'use client';
import React from 'react';
import supabase from '@/services/supabase/client';

function Login() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  return (
    <div>
      <div className='h-vh w-vw md:bg-white bg-primary-blue'>
        <div className='md:flex md:flex-row hidden h-screen'>
          <div className='w-1/2 p-4 flex justify-center items-center'>
            <img src='/assets/img/login_person.png' />
          </div>
          <div className='w-1/2 p-4 bg-primary-blue flex flex-col justify-center items-center'>
            <p className='text-center text-3xl font-semibold mb-4'>
              Please Sign in to Continue
            </p>
            <p className='text-center text-lg font-medium mb-4 mt-4 pl-4 pr-4'>
              Log in to use our automatic video generator and bring your ideas
              to life in the blink of an eye.
            </p>
            <button
              onClick={() => signInWithGoogle()}
              className=' border rounded bg-white font-bold py-4 mt-4 px-6 flex justify-center items-center'
            >
              <span>
                <img src='/assets/img/google.png' className='w-8 h-8' />{' '}
              </span>
              <span className='ml-4 text-black '>Sign In With Google</span>
            </button>
          </div>
        </div>
        <div className='md:hidden h-screen'>
          <div className='w-full p-4 flex justify-center items-center bg-white'>
            <img src='/assets/img/login_person.png' />
          </div>
          <div className='w-full p-4 bg-primary-blue mt-8 flex flex-col justify-center items-center'>
            <p className='text-center text-3xl font-semibold mb-4'>
              Please Sign in to Continue
            </p>
            <p className='text-center text-lg font-medium mb-4 mt-4 pl-4 pr-4'>
              Log in to use our automatic video generator and bring your ideas
              to life in the blink of an eye.
            </p>
            <button
              onClick={() => signInWithGoogle()}
              className=' border rounded bg-white font-bold py-4 mt-4 px-6 flex justify-center items-center'
            >
              <span>
                <img src='/assets/img/google.png' className='w-8 h-8' />{' '}
              </span>
              <span className='ml-4 text-black hover:text-black-500'>
                Sign In With Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
