'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      setError(true);
    } else {
      setUserCreated(true);
    }

    setCreatingUser(false);
  }
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Register</h1>
      {userCreated && (
        <div className='my-4 text-center'>
          User created.
          <br /> Now you can{' '}
          <Link
            className='underline'
            href={'/login'}
          >
            login &raquo;
          </Link>{' '}
        </div>
      )}
      {error && (
        <div className='my-4 text-center'>
          An error occurred while creating the account. Please try again.
        </div>
      )}
      <form
        className='block max-w-xs mx-auto'
        onSubmit={handleFormSubmit}
      >
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        <button
          type='submit'
          disabled={creatingUser}
        >
          Register
        </button>
        <div className='my-4 text-center text-gray-500'>
          or sign in with provider
        </div>
        <button
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex gap-4 justify-center'
          disabled={creatingUser}
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
          Already have an account?{' '}
          <Link
            className='underline text-primary'
            href={'/login'}
          >
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
