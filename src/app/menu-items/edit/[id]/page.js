'use client';
import { useProfile } from '@/components/UseProfile';
import Left from '@/components/icons/Left';
import UserTabs from '@/components/layout/UserTabs';
import { redirect, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MenuItemForm from '@/components/layout/MenuItemForm';
import DeleteButton from '@/components/DeleteButton';

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      response.ok ? resolve() : reject();
      await toast.promise(savingPromise, {
        loading: 'Saving menu item...',
        success: 'Menu item saved!',
        error: 'Failed to save menu item!',
      });
      setRedirectToItems(true);
    });
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/menu-items?_id=' + id, {
        method: 'DELETE',
      });

      res.ok ? resolve() : reject();
    });

    toast.promise(promise, {
      loading: 'Deleting menu item...',
      success: 'Menu item deleted!',
      error: 'Failed to delete menu item!',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <div className='max-w-2xl mx-auto mt-8'>
        <Link
          href={'/menu-items'}
          className='button'
        >
          <Left />
          <span>Show items</span>
        </Link>
      </div>
      <MenuItemForm
        menuItem={menuItem}
        onSubmit={handleFormSubmit}
      />
      <div className='max-w-2xl mx-auto mt-2'>
        <div className='max-w-xs ml-auto pl-4'>
          <DeleteButton
            label={'Delete item'}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}
