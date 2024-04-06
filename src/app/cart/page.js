'use client';

import { CartContext, cartProductPrice } from '@/components/AppContext';
import { useProfile } from '@/components/UseProfile';
import Trash from '@/components/icons/Trash';
import AddressInputs from '@/components/layout/AddressInputs';
import SectionHeaders from '@/components/layout/SectionHeaders';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;

      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  let total = 0;

  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  return (
    <section className='mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader='Cart' />
      </div>
      <div className='grid gap-8 grid-cols-2 mt-8'>
        <div className=''>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product.name_id}
                className='flex items-center gap-4 border-b py-4'
              >
                <div className='w-24'>
                  <Image
                    src={product.image}
                    height={240}
                    width={240}
                    alt={product.name}
                  />
                </div>
                <div className='grow'>
                  <h3 className='font-semibold'>{product.name}</h3>
                  {product.size && (
                    <div className='text-sm text-gray-900'>
                      Size: <span> {product.size.name} </span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className='text-sm text-gray-500'>
                      {product.extras.map((extra) => (
                        <div key={extra.name}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-lg font-semibold'>
                  ${cartProductPrice(product)}
                </div>
                <div className='ml-2'>
                  <button
                    type='button'
                    className='p-2'
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className='py-2 text-right pr-16'>
            <span className='text-gray-500'>Total:</span>
            <span className='text-lg font-semibold pl-2'>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className=''>Checkout</h2>
          <form action=''>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type='submit'>Pay ${total.toFixed(2)}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
