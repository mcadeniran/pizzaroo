'use client';
import { useProfile } from '@/components/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/users').then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return 'Loading users info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs isAdmin={true} />{' '}
      <div className='mt-8'>
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className='bg-gray-100 rounded-lg mb-2 p-1 flex px-4 items-center gap-4'
            >
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 grow'>
                <div className='text-gray-900'>
                  {!!user.name && <span> {user.name}</span>}
                  {!user.name && <span className='italic'> {'No name'}</span>}
                </div>
                <span className='text-gray-500'>{user.email}</span>
              </div>
              <div className=''>
                <Link
                  className='button'
                  href={'/users/' + user._id}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
