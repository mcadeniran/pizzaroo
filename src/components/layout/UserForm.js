'use client';
import { useState } from 'react';
import EditableImage from '@/components/layout/EditableImage';
import { useProfile } from '../UseProfile';
import AddressInputs from './AddressInputs';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'city') setCity(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className='flex gap-4 '>
      <div>
        <div className=' p-2 rounded-lg relative max-w-[120px]'>
          <EditableImage
            link={image}
            setLink={setImage}
          />
        </div>
      </div>
      <form
        className='grow'
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            postalCode,
            country,
            admin,
          })
        }
      >
        <label>Name and Surname</label>
        <input
          type='text'
          placeholder='Name and Surname'
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={user.email}
          disabled
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div className=''>
            <label
              className='inline-flex items-center p-2 gap-2  mb-2'
              htmlFor='adminCb'
            >
              <input
                type='checkbox'
                name=''
                id='adminCb'
                value={'1'}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span className=''>Admin</span>{' '}
            </label>
          </div>
        )}

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
