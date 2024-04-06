'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Sign In</h1>
      <form
        className='max-w-xs mx-auto'
        onSubmit={handleFormSubmit}
      >
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loginInProgress}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loginInProgress}
        />
        <button
          type='submit'
          disabled={loginInProgress}
        >
          Sign In
        </button>
        <div className='my-4 text-center text-gray-500'>
          or sign in with provider
        </div>
        <button
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex gap-4 justify-center'
          disabled={loginInProgress}
        >
          <Image
            src={'/google.png'}
            alt='google'
            width={24}
            height={24}
          />{' '}
          Sign in with Google
        </button>
        <div className='text-center my-4 border-t pt-4 '>
          {"Don't"} have an account?{' '}
          <Link
            className='underline text-primary'
            href={'/register'}
          >
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
